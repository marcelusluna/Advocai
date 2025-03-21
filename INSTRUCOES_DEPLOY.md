# Instruções para Deploy na Vercel

Este guia contém as etapas para fazer deploy deste projeto na Vercel, além de solucionar o erro "Command 'npm install' exited with 1".

## Arquivos adicionados/modificados para resolver o problema

1. **package.json**: Versões das dependências foram ajustadas para garantir compatibilidade.
2. **vercel.json**: Configuração para o deploy na Vercel, incluindo redirects e configurações de cache.
3. **.npmrc**: Configurações para resolver problemas de instalação de dependências.
4. **_redirects**: Garantir que as rotas da SPA funcionem corretamente.
5. **vite.config.ts**: Simplificado para remover plugins problemáticos.

## Passos para deploy na Vercel

1. Faça commit de todas as alterações para o GitHub:
   ```
   git add .
   git commit -m "Ajustes para deploy na Vercel"
   git push
   ```

2. Acesse [vercel.com](https://vercel.com) e conecte-se com sua conta GitHub.

3. Importe o repositório e configure o projeto:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`

4. Adicione as seguintes variáveis de ambiente na Vercel (mesmas do seu arquivo .env):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY` 
   - `VITE_OPENAI_API_KEY`

5. Clique em "Deploy" e aguarde a conclusão do processo.

## Problemas comuns e soluções

### Se o erro persistir:

1. Tente fazer deploy usando o CLI da Vercel localmente:
   ```
   npm install -g vercel
   vercel login
   vercel
   ```

2. Verifique os logs de build na Vercel para identificar qual dependência está causando o problema.

3. O repositório foi configurado para usar `--legacy-peer-deps` no arquivo `.npmrc`, o que deve resolver a maioria dos problemas de compatibilidade. 