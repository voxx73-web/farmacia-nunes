/* Backend opcional: Firebase Firestore.
   GitHub Pages não executa servidor. Para sincronizar produtos entre dispositivos,
   cria uma app Firebase, copia firebase-config.example.js para firebase-config.js
   e preenche a configuração. Sem Firebase, o projeto funciona localmente com
   localStorage. */
const KEY='nunes-care-products-v2';
let firebaseReady=false, db=null;
async function setupFirebase(){
 try{
  const cfg=await import('./firebase-config.js');
  if(!cfg.firebaseConfig?.projectId)return false;
  const {initializeApp}=await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js');
  const {getFirestore,collection,getDocs,addDoc,deleteDoc,doc}=await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js');
  const app=initializeApp(cfg.firebaseConfig);db={getFirestore,collection,getDocs,addDoc,deleteDoc,doc,app};firebaseReady=true;return true;
 }catch(e){return false}
}
const local=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
const saveLocal=a=>localStorage.setItem(KEY,JSON.stringify(a));
async function loadProducts(base){
 if(!firebaseReady)await setupFirebase();
 if(firebaseReady){try{const snap=await db.getDocs(db.collection(db.getFirestore(db.app),'products'));const custom=snap.docs.map(d=>({id:d.id,...d.data(),base:false}));return [...base,...custom]}catch(e){console.warn('Firebase indisponível',e)}}
 return [...base,...local()];
}
async function saveProduct(p){
 if(!firebaseReady)await setupFirebase();
 if(firebaseReady){try{const data={name:p.name,active:p.active,type:p.type,use:p.use,symptoms:p.symptoms,rx:p.rx,warning:p.warning,createdAt:p.createdAt};await db.addDoc(db.collection(db.getFirestore(db.app),'products'),data);return}catch(e){console.warn(e)}}
 const a=local();a.unshift(p);saveLocal(a);
}
async function deleteProduct(id){
 if(!firebaseReady)await setupFirebase();
 if(firebaseReady&&!id.startsWith('custom-')){try{await db.deleteDoc(db.doc(db.getFirestore(db.app),'products',id));return}catch(e){console.warn(e)}}
 saveLocal(local().filter(x=>x.id!==id));
}
function isBackendConfigured(){return firebaseReady}

window.NunesBackend={loadProducts,saveProduct,deleteProduct,isBackendConfigured};
