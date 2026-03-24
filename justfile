set shell := ["bash", "-cu"]

default:
  @just --list

dev:
  npx react-router dev

build:
  npx react-router build

dev-static:
  npx react-router build && vite preview

deploy env="preview":
  node scripts/deploy.mjs {{env}}

typecheck:
  npx wrangler types && npx react-router typegen && npx tsc -b

verify target="local":
  node scripts/verify.mjs {{target}}

cf-typegen:
  npx wrangler types
