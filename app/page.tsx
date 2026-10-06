"use client";
import {FormEvent,useState} from "react";

type Result={title:string;description:string;thumbnail:string;url:string;source:string;downloadAllowed:boolean;message:string};

export default function Home(){
  const [url,setUrl]=useState("");
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState<Result|null>(null);
  const [error,setError]=useState("");

  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setError(""); setResult(null);
    try{
      const r=await fetch("/api/analyze",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({url})});
      const data=await r.json(); if(!r.ok) throw new Error(data.error||"Gagal menganalisis URL.");
      setResult(data);
    }catch(err){setError(err instanceof Error?err.message:"Terjadi kesalahan.");}
    finally{setLoading(false)}
  }

  return <main className="wrap">
    <section className="hero">
      <span className="badge">SHORT DRAMA TOOL</span>
      <h1>Download drama.<br/>Dengan cara yang benar.</h1>
      <p>Tempel URL halaman drama untuk membaca metadata publik. Tombol download hanya muncul bila sumber menyediakan media yang memang dapat diunduh.</p>
    </section>
    <section className="card">
      <form className="form" onSubmit={submit}>
        <input className="input" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://shortdrama.st/id/series/..." type="url" required />
        <button className="button" disabled={loading}>{loading?"Analyzing...":"Analyze"}</button>
      </form>
      {error&&<div className="status error">{error}</div>}
      {result&&<div className="result">
        <div className="grid">
          {result.thumbnail?<img className="thumb" src={result.thumbnail} alt={result.title}/>:<div className="thumb"/>}
          <div>
            <h2 className="title">{result.title}</h2>
            <div className="muted">{result.source}</div>
            <p className="muted">{result.description||"Tidak ada deskripsi publik."}</p>
            <div className="status">{result.message}</div>
            {result.downloadAllowed&&<p><a className="button" href={result.url}>Open download source</a></p>}
          </div>
        </div>
      </div>}
    </section>
    <div className="footer">Use only for media you own or are authorized to download.</div>
  </main>
}