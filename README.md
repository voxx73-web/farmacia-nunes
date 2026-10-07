# Farmácia Nunes — GitHub Pages

Versão mobile-first do organizador pessoal de medicamentos, cremes e chás/infusões.

## O que mudou
- Interface inspirada no conceito enviado: cartões, cores suaves, navegação inferior e experiência de app.
- Pesquisa por produto, composição e sintomas.
- Categorias de medicamentos, cremes/géis e chás/infusões.
- Botão **Adicionar** com formulário completo.
- Botão **Apagar** apenas para produtos adicionados pelo utilizador.
- Todos os produtos base e os chás enviados nas fotografias estão incluídos.
- Funciona diretamente offline (abrindo `index.html`) usando `localStorage`. A versão anterior usava módulos ES (`type="module"`), que podem ser bloqueados por alguns navegadores quando o ficheiro é aberto com `file://`. Esta versão foi corrigida para funcionar offline.
- Backend opcional com **Firebase Firestore**, para que os produtos adicionados possam ficar sincronizados entre dispositivos.

## Publicar no GitHub Pages
1. Cria um repositório, por exemplo `farmacia-nunes`.
2. Envia os ficheiros deste diretório para a raiz do repositório.
3. GitHub → **Settings → Pages** → **Deploy from a branch** → `main` / `root`.
4. Abre o endereço indicado pelo GitHub.

## Ativar backend Firebase (opcional)
GitHub Pages é apenas alojamento estático; não executa Node/PHP. Para guardar produtos online usa-se Firebase Firestore.

1. Cria um projeto em Firebase.
2. Cria uma Web App.
3. Ativa Firestore Database.
4. Copia `firebase-config.example.js` para `firebase-config.js` e coloca os dados da Web App.
5. Define regras do Firestore. Para uma aplicação pessoal, recomenda-se ativar autenticação antes de permitir escrita pública.
6. Faz commit de `firebase-config.js` apenas se compreenderes que a configuração web não é um segredo; **nunca** coloques service-account keys no repositório.

### Estrutura
- `index.html` — aplicação
- `style.css` — interface mobile
- `app.js` — navegação, sintomas e produtos
- `backend.js` — localStorage + Firebase opcional
- `firebase-config.example.js` — modelo de configuração

> Informação educativa. Não diagnostica nem substitui médico/farmacêutico. Confirma sempre a bula e a situação de receita da apresentação concreta em Portugal.
