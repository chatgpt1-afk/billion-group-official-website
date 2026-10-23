"""Translate V53 English catalog offline using a locally cached NLLB model.
First use downloads the free open-weight model; later translations work offline.
No Google Cloud account, API key, or paid translation service required.
"""
import argparse, json, re, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
SRC=ROOT/'translations/en.json'
MODEL='facebook/nllb-200-distilled-600M'
TARGET={'ms':'zsm_Latn','zh':'zho_Hans'}
SOURCE='eng_Latn'
PROTECTED=['Billion Group of Companies','Pantai Timor','MyKasih','Segamat','UTAR','Billion']
def main():
    p=argparse.ArgumentParser()
    p.add_argument('--language',choices=['ms','zh','all'],default='all')
    p.add_argument('--offline',action='store_true',help='Require cached model files; never download')
    p.add_argument('--limit',type=int,default=0,help='Optional test limit')
    args=p.parse_args()
    try:
        import torch
        from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
    except ImportError:
        raise SystemExit('Install dependencies: py -m pip install -r tools/requirements.txt')
    print('Loading free local NLLB translation model (first run may download ~2.5GB)...')
    tokenizer=AutoTokenizer.from_pretrained(MODEL,src_lang=SOURCE,local_files_only=args.offline)
    model=AutoModelForSeq2SeqLM.from_pretrained(MODEL,local_files_only=args.offline)
    source=json.loads(SRC.read_text(encoding='utf-8'))
    for lang in (['ms','zh'] if args.language=='all' else [args.language]):
        dest=ROOT/'translations'/f'{lang}.json'
        cachefile=ROOT/'translations'/f'.cache-{lang}.json'
        cache=json.loads(cachefile.read_text(encoding='utf-8')) if cachefile.exists() else {}
        out={};changed=0
        for key,text in source.items():
            digest=hashlib.sha256(text.encode()).hexdigest()
            cachekey=key+':'+digest
            if cachekey in cache:out[key]=cache[cachekey];continue
            if args.limit and changed>=args.limit:continue
            if not re.search('[A-Za-z]',text):out[key]=text;continue
            tokenizer.src_lang=SOURCE
            tokens=tokenizer(text,return_tensors='pt',truncation=True,max_length=450)
            with torch.no_grad():ids=model.generate(**tokens,forced_bos_token_id=tokenizer.convert_tokens_to_ids(TARGET[lang]),max_new_tokens=480)
            translation=tokenizer.batch_decode(ids,skip_special_tokens=True)[0]
            # Proper nouns need editorial review; do not pretend they are guaranteed protected.
            out[key]=translation;cache[cachekey]=translation;changed+=1
            if changed%20==0:print(lang,'new translations:',changed)
        dest.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
        cachefile.write_text(json.dumps(cache,ensure_ascii=False,indent=2),encoding='utf-8')
        print(lang,'translated:',len(out),'new:',changed)
    print('Finished. Review translations, then publish the updated site folder.')
if __name__=='__main__':main()
