import {NextResponse} from "next/server";
import * as cheerio from "cheerio";

const ALLOWED_HOSTS=["shortdrama.st","www.shortdrama.st"];

export async function POST(req:Request){
  try{
    const {url}=await req.json();
    if(typeof url!=="string") return NextResponse.json({error:"URL tidak valid."},{status:400});
    const parsed=new URL(url);
    if(!ALLOWED_HOSTS.includes(parsed.hostname)) return NextResponse.json({error:"Untuk saat ini hanya URL ShortDrama.st yang didukung."},{status:400});
    const response=await fetch(parsed.toString(),{headers:{"user-agent":"ShortDramaDownloader/1.0 (metadata analyzer)","accept":"text/html,application/xhtml+xml"},redirect:"follow",cache:"no-store"});
    if(!response.ok) return NextResponse.json({error:`Sumber mengembalikan HTTP ${response.status}.`},{status:502});
    const html=await response.text();
    const $=cheerio.load(html);
    const title=$('meta[property="og:title"]').attr("content")||$("title").text().trim()||"Untitled";
    const description=$('meta[property="og:description"]').attr("content")||$('meta[name="description"]').attr("content")||"";
    const thumbnail=$('meta[property="og:image"]').attr("content")||"";
    return NextResponse.json({
      title,description,thumbnail,url:parsed.toString(),source:parsed.hostname,
      downloadAllowed:false,
      message:"Metadata publik berhasil dibaca. Sumber ini belum memberikan direct-download URL yang dapat digunakan oleh tool ini. Tidak ada proteksi, VIP, token, DRM, atau player yang dibypass."
    });
  }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"Gagal memproses URL."},{status:400})}
}