set shell := ["bash", "-cu"]

default:
  @just --list

dev:
  npm run dev

build:
  npm run build

dev-static:
  npm run build
  npm run dev-static

deploy env="preview":
  npm run deploy -- {{env}}

verify target="local":
  node scripts/verify.mjs {{target}}
