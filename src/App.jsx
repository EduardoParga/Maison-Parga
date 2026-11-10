import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, Flower2, Instagram, MessageCircle, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Trash2, X } from 'lucide-react';

const fakharRoseImage = 'https://lookalyfe.com/cdn/shop/files/Look-Alyfe-Lattafa-Fakhar-Rose-Eau-de-Parfum-100ml-4748.png?v=1737421716&width=1214';
const whatsappNumber = '5521964236538';
const instagramUrl = '';
const initialProducts = [
  { id: 'amber-oud', name: 'Amber Oud Gold Edition', brand: 'AL HARAMAIN', family: 'Amadeirado', price: 289, stock: 5, size: '100 ml', notes: 'Abacaxi • Âmbar • Baunilha', image: 'photo-1594035910387-fea47794261f', referencePerfume: 'Erba Pura — Xerjoff' },
  { id: 'yara', name: 'Yara', brand: 'LATTAFA', family: 'Floral', price: 219, stock: 8, size: '100 ml', notes: 'Orquídea • Baunilha • Almíscar', image: 'photo-1541643600914-78b084683601', referencePerfume: 'Semelhança olfativa delicada e cremosa' },
  { id: 'khamrah', name: 'Khamrah', brand: 'LATTAFA', family: 'Oriental', price: 249, stock: 3, size: '100 ml', notes: 'Canela • Tâmara • Pralinê', image: 'photo-1592945403244-b3fbafd7f539', referencePerfume: 'Angel’s Share — Kilian' },
  { id: 'ana-abiyedh', name: 'Ana Abiyedh Rouge', brand: 'LATTAFA', family: 'Ambarado', price: 199, stock: 6, size: '60 ml', notes: 'Açafrão • Âmbar • Musk', image: 'photo-1595425970377-c9703cf48b6d', referencePerfume: '' },
  { id: 'asad', name: 'Asad', brand: 'LATTAFA', family: 'Amadeirado', price: 229, stock: 0, size: '100 ml', notes: 'Pimenta • Café • Baunilha', image: 'photo-1615634260167-c8cdede054de', referencePerfume: 'Sauvage Elixir — Dior' },
  { id: 'fakhar', name: 'Fakhar Rose', brand: 'LATTAFA', family: 'Floral', price: 209, stock: 4, size: '100 ml', notes: 'Frutas • Jasmim • Baunilha', image: fakharRoseImage, referencePerfume: '' },
];
const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const imageUrl = (image) => image.startsWith('http') || image.startsWith('data:') ? image : `https://images.unsplash.com/${image}?auto=format&fit=crop&w=850&q=85`;

function readProducts() {
  try { const saved = localStorage.getItem('oud-stock-products'); return saved ? JSON.parse(saved).map((product) => { const normalized = { ...product, referencePerfume: product.referencePerfume ?? product.dupe ?? '', referenceImage: product.referenceImage ?? product.dupeImage ?? '' }; delete normalized.dupe; delete normalized.dupeImage; return normalized.id === 'fakhar' ? { ...normalized, image: fakharRoseImage } : normalized; }) : initialProducts; }
  catch { return initialProducts; }
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, 600 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function App() {
  const [products, setProducts] = useState(readProducts);
  const [admin, setAdmin] = useState(() => window.location.pathname.endsWith('/admin'));
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('Todos');
  const [sort, setSort] = useState('Destaques');
  const [selected, setSelected] = useState(null);
  const [referenceImageOpen, setReferenceImageOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [notice, setNotice] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const heroPointerStart = useRef(null);
  const heroProducts = useMemo(() => (products.length ? products : initialProducts).slice(0, 5), [products]);
  const currentHeroIndex = heroIndex % heroProducts.length;
  const heroProduct = heroProducts[currentHeroIndex];
  useEffect(() => { localStorage.setItem('oud-stock-products', JSON.stringify(products)); }, [products]);
  useEffect(() => {
    [-1, 1].forEach((step) => {
      const product = heroProducts[(currentHeroIndex + step + heroProducts.length) % heroProducts.length];
      if (product?.image) { const image = new Image(); image.src = imageUrl(product.image); }
    });
  }, [currentHeroIndex, heroProducts]);
  useEffect(() => {
    if (admin || heroProducts.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const interval = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroProducts.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [admin, heroProducts.length]);
  useEffect(() => {
    const syncRoute = () => setAdmin(window.location.pathname.endsWith('/admin'));
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);
  const goTo = (isAdmin) => {
    window.history.pushState({}, '', isAdmin ? `${import.meta.env.BASE_URL}admin` : import.meta.env.BASE_URL);
    setAdmin(isAdmin);
    window.scrollTo(0, 0);
  };
  const families = ['Todos', ...new Set(products.map((p) => p.family).filter(Boolean))];
  const visible = useMemo(() => {
    const list = products.filter((p) => (family === 'Todos' || p.family === family) && `${p.name} ${p.brand} ${p.notes}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'Menor preço') list.sort((a, b) => a.price - b.price);
    if (sort === 'Maior preço') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, family, query, sort]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const update = (id, changes) => setProducts((all) => all.map((p) => p.id === id ? { ...p, ...changes } : p));
  const moveHero = (step) => setHeroIndex((index) => (index + step + heroProducts.length) % heroProducts.length);
  const handleHeroKeyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); moveHero(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); moveHero(-1); }
    if (event.key === 'Home') { event.preventDefault(); setHeroIndex(0); }
    if (event.key === 'End') { event.preventDefault(); setHeroIndex(heroProducts.length - 1); }
  };
  const handleHeroDragStart = (clientX) => { heroPointerStart.current = clientX; };
  const handleHeroDragEnd = (clientX) => {
    if (heroPointerStart.current === null) return;
    const distance = clientX - heroPointerStart.current;
    heroPointerStart.current = null;
    if (Math.abs(distance) > 45) moveHero(distance < 0 ? 1 : -1);
  };
  const handleHeroPointerDown = (event) => { if (event.pointerType !== 'touch') handleHeroDragStart(event.clientX); };
  const handleHeroPointerUp = (event) => { if (event.pointerType !== 'touch') handleHeroDragEnd(event.clientX); };
  const handleHeroTouchStart = (event) => { handleHeroDragStart(event.changedTouches[0].clientX); };
  const handleHeroTouchEnd = (event) => { handleHeroDragEnd(event.changedTouches[0].clientX); };
  const addToCart = (product) => {
    if (product.stock < 1) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) return items.map((item) => item.id === product.id ? { ...item, quantity: Math.min(product.stock, item.quantity + 1) } : item);
      return [...items, { id: product.id, quantity: 1 }];
    });
    setSelected(null);
    setCartOpen(true);
  };
  const changeCartQuantity = (id, quantity) => {
    const product = products.find((item) => item.id === id);
    if (!product) return;
    if (quantity <= 0) setCart((items) => items.filter((item) => item.id !== id));
    else setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: Math.min(product.stock, quantity) } : item));
  };
  const checkout = () => {
    const order = cart.map((item) => ({ product: products.find((p) => p.id === item.id), quantity: item.quantity }))
      .filter((item) => item.product && item.product.stock > 0)
      .map((item) => ({ ...item, quantity: Math.min(item.quantity, item.product.stock) }));
    if (!order.length) return;
    const total = order.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const lines = order.map(({ product, quantity }) => `• ${product.name} (${quantity}x) — ${money(product.price * quantity)}`).join('\n');
    const message = encodeURIComponent(`Olá! Quero fazer este pedido:\n${lines}\n\nTotal: ${money(total)}\nPodemos combinar o pagamento e a entrega?`);
    setCart([]);
    setCartOpen(false);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    setNotice('Pedido enviado pelo WhatsApp. Confirme a venda e registre a saída no painel para atualizar o estoque.');
    window.setTimeout(() => setNotice(''), 6000);
  };
  const saveForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const referenceFile = data.get('referenceImageFile');
    const productFile = data.get('productImageFile');
    const item = Object.fromEntries(data.entries());
    delete item.referenceImageFile;
    delete item.productImageFile;
    item.price = Number(item.price); item.stock = Number(item.stock); item.id = form.id || `${Date.now()}`;
    item.referenceImage = referenceFile?.size ? await compressImage(referenceFile) : (form.referenceImage || '');
    item.image = productFile?.size ? await compressImage(productFile) : (form.image || '');
    setProducts((all) => form.id ? all.map((p) => p.id === form.id ? { ...p, ...item } : p) : [{ ...item, image: item.image || 'photo-1594035910387-fea47794261f' }, ...all]);
    setForm(null);
  };

  return <div className="store">
    <div className="announcement"><Sparkles size={14} /> PERFUMARIA ÁRABE • SEU PRÓXIMO PERFUME FAVORITO ESTÁ AQUI</div>
      <header className="topbar"><a className="wordmark" href={import.meta.env.BASE_URL} aria-label="Maison Parga Parfum — início"><img className="brand-logo" src={import.meta.env.BASE_URL + 'maison-parga-logo.svg'} alt="Maison Parga Parfum"/></a><nav><a href="#colecao">Coleção</a><a href="#sobre">Sobre Nós</a></nav><button type="button" className="cart-trigger" onClick={()=>setCartOpen(true)}><ShoppingBag size={17}/><span>Carrinho</span>{cartCount>0&&<b>{cartCount}</b>}</button></header>
    {admin ? <main className="admin-page"><div className="admin-heading"><div><span className="eyebrow">PAINEL DA LOJISTA</span><h1>Seu estoque,<br/><em>em boas mãos.</em></h1><p>Atualize os produtos e acompanhe o que está disponível.</p></div><div className="admin-actions"><button className="button button-outline" onClick={() => goTo(false)}><ArrowLeft size={16}/> Voltar para loja</button><button className="button button-dark" onClick={() => setForm({})}><Plus size={17}/> Adicionar perfume</button></div></div><div className="admin-stats"><div><span>Produtos cadastrados</span><strong>{products.length}</strong></div><div><span>Unidades em estoque</span><strong>{products.reduce((s,p) => s + Number(p.stock), 0)}</strong></div><div><span>Produtos esgotados</span><strong>{products.filter(p => Number(p.stock) === 0).length}</strong></div></div><div className="table-wrap"><table><thead><tr><th>Produto</th><th>Preço</th><th>Estoque</th><th>Família</th><th>Ações</th></tr></thead><tbody>{products.map((p) => <tr key={p.id}><td><div className="table-product"><img src={imageUrl(p.image)} alt=""/><span><b>{p.name}</b><small>{p.brand} · {p.size}</small></span></div></td><td>{money(p.price)}</td><td><div className="stock-controls"><button aria-label={`Registrar uma unidade vendida de ${p.name}`} title="Registrar saída após confirmar venda" onClick={() => update(p.id, { stock: Math.max(0, Number(p.stock)-1) })}><Minus size={14}/></button><b className={p.stock === 0 ? 'out-stock' : ''}>{p.stock}</b><button aria-label="Aumentar estoque" onClick={() => update(p.id, { stock: Number(p.stock)+1 })}><Plus size={14}/></button></div></td><td>{p.family}</td><td><div className="row-actions"><button onClick={() => setForm(p)}>Editar</button><button className="delete-button" aria-label={`Remover ${p.name}`} onClick={() => setProducts((all) => all.filter((item) => item.id !== p.id))}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div><p className="local-note"><CircleHelp size={16}/> Depois de confirmar a venda, use − para registrar a saída. O estoque fica salvo neste navegador; para compartilhar entre aparelhos, é necessário conectar um banco de dados.</p></main> : <><main><section id="inicio" className="hero"><div className="hero-copy"><img className="hero-brand-logo" src={import.meta.env.BASE_URL + 'maison-parga-logo-stacked.svg'} alt="Maison Parga Parfum"/><div className="hero-message"><span className="eyebrow"><span className="eyebrow-line"/> PERFUMARIA ÁRABE · RIO DE JANEIRO</span><h1>Uma presença<br/>que fica na <em>memória.</em></h1><p>Perfumes do Oriente para transformar cada encontro em uma lembrança.</p><a className="button button-light" href="#colecao">Encontrar meu perfume <ArrowDown size={16}/></a><div className="hero-trust"><span><Check size={14}/> Fragrâncias selecionadas</span><span><Check size={14}/> Atendimento próximo</span></div></div></div><div className="hero-image" role="region" aria-roledescription="carrossel" aria-label="Vitrine de perfumes" tabIndex={0} onKeyDown={handleHeroKeyDown} onPointerDown={handleHeroPointerDown} onPointerUp={handleHeroPointerUp} onPointerCancel={()=>{heroPointerStart.current=null}} onMouseDown={(event)=>handleHeroDragStart(event.clientX)} onMouseUp={(event)=>handleHeroDragEnd(event.clientX)} onTouchStart={handleHeroTouchStart} onTouchEnd={handleHeroTouchEnd} onTouchCancel={()=>{heroPointerStart.current=null}}><div className="hero-carousel-stage"><div className="hero-slide" key={heroProduct.id}><img src={imageUrl(heroProduct.image)} alt={`${heroProduct.name}, ${heroProduct.brand}, ${heroProduct.size}`} fetchPriority={currentHeroIndex===0?'high':'auto'}/>{heroProduct.stock===0&&<span className="hero-product-status">ESGOTADO</span>}</div><button type="button" className="hero-carousel-arrow hero-carousel-prev" onClick={()=>moveHero(-1)} aria-label="Perfume anterior"><ArrowLeft size={17}/></button><button type="button" className="hero-carousel-arrow hero-carousel-next" onClick={()=>moveHero(1)} aria-label="Próximo perfume"><ArrowRight size={17}/></button></div><div className="hero-image-shade"/><div className="hero-stamp"><Flower2 size={19}/><span>ESSÊNCIAS<br/>DO ORIENTE</span></div><div className="hero-caption" aria-live="polite" aria-atomic="true"><span>{heroProduct.brand} · {heroProduct.size}</span><b>{heroProduct.name}</b><small>{money(heroProduct.price)}{heroProduct.notes?` · ${heroProduct.notes}`:''}</small></div><div className="hero-carousel-dots" role="group" aria-label="Selecionar perfume">{heroProducts.map((product,index)=><button type="button" key={product.id} className={index===currentHeroIndex?'active':''} onClick={()=>setHeroIndex(index)} aria-label={`Mostrar ${product.name}`} aria-current={index===currentHeroIndex?'true':undefined}/>)}</div></div><div className="hero-side-note">FRAGRÂNCIAS COM HISTÓRIA <span>✳</span></div></section>
    <section className="intro-band"><div className="intro-mark"><Flower2 size={26}/></div><p>Tem perfume que a gente usa.<br/><em>Tem perfume que vira assinatura.</em></p><span>Uma curadoria de perfumes árabes para quem gosta de deixar presença por onde passa.</span></section>
    <section id="sobre" className="about-store"><div className="about-store-art"><div className="about-image-back"><img src={imageUrl(products[2]?.image || initialProducts[2].image)} alt="Fragrância da coleção Maison Parga Parfum"/></div><div className="about-image-front"><img src={imageUrl(products[1]?.image || initialProducts[1].image)} alt="Perfume selecionado pela Maison Parga Parfum"/></div><span className="about-seal"><Flower2 size={22}/> MAISON<br/>PARGA</span></div><div className="about-store-copy"><span className="eyebrow"><span className="eyebrow-line"/> SOBRE NÓS</span><h2>Um aroma para<br/>chamar de <em>seu.</em></h2><p>A Maison Parga Parfum reúne fragrâncias marcantes, escolhidas para quem quer encontrar um perfume que combine com a própria personalidade. Nossa curadoria aproxima perfumes especiais de uma experiência de compra acolhedora, com ajuda para escolher cada detalhe.</p><p>Explore a coleção, conheça as notas e fale com a gente para tirar dúvidas sobre disponibilidade, pagamento e entrega.</p><div className="about-contact"><a className="about-social" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/><span><b>WhatsApp</b><small>Fale com a loja</small></span><ArrowRight size={15}/></a>{instagramUrl?<a className="about-social" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17}/><span><b>Instagram</b><small>Acompanhe a loja</small></span><ArrowRight size={15}/></a>:<span className="about-social is-coming"><Instagram size={17}/><span><b>Instagram</b><small>Em breve</small></span></span>}</div></div></section><section id="colecao" className="collection"><div className="section-head"><div><span className="eyebrow"><span className="eyebrow-line"/> NOSSA CURADORIA</span><h2>Encontre sua <em>essência.</em></h2><p>Descubra fragrâncias que contam histórias antes mesmo de você dizer uma palavra.</p></div><span className="collection-count">{visible.length.toString().padStart(2,'0')} FRAGRÂNCIAS</span></div><div className="filters"><div className="category-tabs">{families.map((x) => <button key={x} className={family===x?'active':''} onClick={() => setFamily(x)}>{x}</button>)}</div><div className="filter-tools"><label className="search-box"><Search size={17}/><input placeholder="Buscar perfume..." value={query} onChange={(e)=>setQuery(e.target.value)}/></label><label className="sort-box"><SlidersHorizontal size={16}/><select value={sort} onChange={(e)=>setSort(e.target.value)}><option>Destaques</option><option>Menor preço</option><option>Maior preço</option></select><ChevronDown size={14}/></label></div></div><div className="product-grid">{visible.map((p, i) => <article className="product-card" key={p.id} style={{'--delay':`${i*65}ms`}}><button className="product-image" onClick={()=>setSelected(p)} aria-label={`Ver ${p.name}`}><img className="product-image-main" src={imageUrl(p.image)} alt={`Perfume ${p.name}`} style={{objectFit:p.imageFit||'cover'}}/><span className="image-arrow"><ArrowRight size={18}/></span></button><div className="product-info"><div className="product-meta"><span>{p.brand}</span><span>{p.size}</span></div><div className="product-status">{p.stock===0?<span className="product-badge badge-muted">ESGOTADO</span>:p.stock<4?<span className="product-badge">POUCAS UNIDADES</span>:<span className="product-badge">{p.family.toUpperCase()}</span>}</div><h3>{p.name}</h3><p className="product-notes">{p.notes}</p>{p.referencePerfume&&<button type="button" className="dupe-line" onClick={()=>setSelected(p)}><Sparkles size={13}/><span><b>PERFUME DE REFERÊNCIA</b><small>Ver perfume de referência</small></span><ArrowRight size={13}/></button>}<div className="product-buy"><strong>{money(p.price)}</strong><button disabled={p.stock===0} onClick={()=>addToCart(p)}>{p.stock===0?'Indisponível':'Adicionar'} <ShoppingBag size={14}/></button></div></div></article>)}</div>{visible.length===0&&<div className="empty-state"><Search size={26}/><b>Nenhum perfume encontrado</b><span>Tente outro nome ou família olfativa.</span></div>}<div className="collection-foot"><span><span className="foot-flower">✳</span> Selecionados com cuidado, para você.</span><a href="#inicio">VOLTAR AO INÍCIO <ArrowRight size={15}/></a></div></section>
    <section className="closing"><span className="eyebrow"><span className="eyebrow-line"/> UM BOM PERFUME FICA</span><p>Encontre a fragrância<br/>que <em>fala por você.</em></p><a href="#colecao">Explore a coleção <ArrowRight size={16}/></a><Flower2 className="closing-flower" size={190}/></section></main><footer className="footer"><a className="wordmark footer-brand" href={import.meta.env.BASE_URL}><img className="brand-logo" src={import.meta.env.BASE_URL + 'maison-parga-logo.svg'} alt="Maison Parga Parfum"/></a><span>Perfumes árabes escolhidos com carinho.</span><a className="footer-whatsapp" href="https://wa.me/5521964236538" target="_blank" rel="noreferrer">Fale com a gente <ArrowRight size={14}/></a><small>© 2026 Maison Parga Parfum</small></footer></>}
    {selected&&<div className="modal-backdrop" onMouseDown={(e)=>e.target===e.currentTarget&&setSelected(null)}><section className="product-modal"><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Fechar"><X/></button><div className="modal-product-media"><img className="modal-product-main" src={imageUrl(selected.image)} alt={`Perfume ${selected.name}`} style={{objectFit:selected.imageFit||'cover'}}/></div><div className="modal-copy"><span className="eyebrow">{selected.brand} · {selected.family}</span><h2>{selected.name}</h2><span className="modal-size">{selected.size} · {selected.notes}</span>{selected.referencePerfume&&<div className="modal-dupe"><div className="modal-dupe-heading"><Sparkles size={15}/><span>PERFUME DE REFERÊNCIA</span></div><div className="modal-dupe-details">{selected.referenceImage&&<button className="reference-image-button" onClick={()=>setReferenceImageOpen(true)} aria-label={`Ampliar foto de ${selected.referencePerfume}`}><img src={selected.referenceImage} alt={`Perfume de referência ${selected.referencePerfume}`}/><span><Search size={13}/></span></button>}<span><b>{selected.referencePerfume}</b><small>Referência olfativa</small></span></div></div>}<strong className="modal-price">{money(selected.price)}</strong><span className="modal-stock">{selected.stock ? `${selected.stock} ${selected.stock===1?'unidade disponível':'unidades disponíveis'}` : 'Produto esgotado'}</span><button className="button button-dark modal-buy" disabled={selected.stock===0} onClick={()=>addToCart(selected)}><ShoppingBag size={17}/>{selected.stock===0?'Indisponível':'Adicionar ao carrinho'}</button><small>Você combina pagamento e entrega diretamente com a loja.</small></div></section></div>}
    {form&&<div className="modal-backdrop" onMouseDown={(e)=>e.target===e.currentTarget&&setForm(null)}><form className="edit-form" onSubmit={saveForm}><button type="button" className="modal-close" onClick={()=>setForm(null)} aria-label="Fechar"><X/></button><span className="eyebrow">PAINEL DA LOJISTA</span><h2>{form.id?'Editar perfume':'Novo perfume'}</h2><div className="primary-image-admin"><label>Imagem principal do perfume<input name="productImageFile" type="file" accept="image/*"/><small>Foto que aparece em destaque na vitrine.</small></label><label className="image-fit-label">Enquadramento da foto<select name="imageFit" defaultValue={form.imageFit||'cover'}><option value="cover">Preencher o quadro</option><option value="contain">Mostrar foto inteira</option></select></label>{form.image&&<img src={imageUrl(form.image)} alt="Imagem atual do perfume"/>}</div><label>Nome do perfume<input required name="name" placeholder="Regent Maison Azrar" defaultValue={form.name}/></label><div className="form-row"><label>Marca<input required name="brand" defaultValue={form.brand}/></label><label>Tamanho<input name="size" placeholder="100 ml" defaultValue={form.size}/></label></div><div className="form-row"><label>Preço (R$)<input required name="price" type="number" min="0" step="0.01" defaultValue={form.price}/></label><label>Quantidade<input required name="stock" type="number" min="0" defaultValue={form.stock??0}/></label></div><div className="form-row"><label>Família olfativa<input name="family" placeholder="Floral, amadeirado..." defaultValue={form.family}/></label><label>Notas principais<input name="notes" placeholder="Rosa · baunilha..." defaultValue={form.notes}/></label></div><div className="dupe-admin"><div className="dupe-admin-title"><Sparkles size={15}/><span>PERFUME DE REFERÊNCIA <small>OPCIONAL</small></span></div><label>Perfume de referência<input name="referencePerfume" placeholder="Sospiro Vibrato" defaultValue={form.referencePerfume}/></label><label className="dupe-file-label">Foto do perfume de referência (opcional)<input name="referenceImageFile" type="file" accept="image/*"/><small>Redimensionada automaticamente para aparecer como detalhe.</small></label>{form.referenceImage&&<img className="dupe-upload-preview" src={form.referenceImage} alt="Imagem atual do perfume de referência"/>}</div><p className="local-note"><CircleHelp size={15}/> Os produtos ficam salvos neste navegador.</p><button className="button button-dark form-submit" type="submit"><Check size={17}/> Salvar perfume</button></form></div>}
    {cartOpen&&<div className="cart-overlay" onMouseDown={(e)=>e.target===e.currentTarget&&setCartOpen(false)}><aside className="cart-drawer"><div className="cart-header"><span><small>SUA SELEÇÃO</small><strong>Carrinho <i>({cartCount})</i></strong></span><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div>{cart.length===0?<div className="cart-empty"><ShoppingBag size={28}/><b>Seu carrinho está vazio</b><span>Explore a coleção e escolha seu próximo perfume.</span><a href="#colecao" onClick={()=>setCartOpen(false)}>Ver coleção <ArrowRight size={14}/></a></div>:<><div className="cart-items">{cart.map((item)=>{const product=products.find((p)=>p.id===item.id);if(!product)return null;return <article className="cart-item" key={item.id}><img src={imageUrl(product.image)} alt=""/><div className="cart-item-info"><span className="cart-item-brand">{product.brand}</span><b>{product.name}</b><strong>{money(product.price)}</strong><div className="cart-quantity"><button onClick={()=>changeCartQuantity(product.id,item.quantity-1)} aria-label="Diminuir quantidade"><Minus size={13}/></button><span>{item.quantity}</span><button disabled={item.quantity>=product.stock} onClick={()=>changeCartQuantity(product.id,item.quantity+1)} aria-label="Aumentar quantidade"><Plus size={13}/></button><button className="cart-remove" onClick={()=>changeCartQuantity(product.id,0)} aria-label="Remover produto"><Trash2 size={14}/></button></div></div><span className="cart-line-total">{money(product.price*item.quantity)}</span></article>})}</div><div className="cart-bottom"><a className="cart-continue" href="#colecao" onClick={()=>setCartOpen(false)}>Continuar comprando</a><div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>O estoque é atualizado no painel após você confirmar a venda.</p><button className="button button-dark cart-checkout" onClick={checkout}><MessageCircle size={17}/> Enviar pedido pelo WhatsApp</button></div></>}</aside></div>}{notice&&<div className="toast"><Check size={17}/>{notice}</div>}{referenceImageOpen&&selected?.referenceImage&&<div className="reference-lightbox" onMouseDown={(e)=>e.target===e.currentTarget&&setReferenceImageOpen(false)}><button onClick={()=>setReferenceImageOpen(false)} aria-label="Fechar imagem ampliada"><X/></button><img src={selected.referenceImage} alt={`Imagem ampliada do perfume de referência ${selected.referencePerfume}`}/><span>{selected.referencePerfume}</span></div>}
  </div>;
}
