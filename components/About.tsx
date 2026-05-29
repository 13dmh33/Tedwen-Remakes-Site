import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-warm-dark py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-warm-gray mb-4">Who We Are</p>
        <h2 className="font-display text-3xl md:text-4xl font-normal mb-10 max-w-xl leading-snug">
          Built on Reliability.<br />Finished with Pride.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <p className="text-warm-gray leading-relaxed mb-6">
              Tedwen Remakes LLC is a handyman services company based in Canonsburg, PA,
              dedicated to delivering quality craftsmanship on every project — no matter
              the size. From a fresh coat of paint to a complete drywall repair, we treat
              every home as if it were our own.
            </p>
            <p className="text-warm-gray leading-relaxed">
              We believe good work speaks for itself. Our approach is straightforward:
              show up on time, communicate clearly, and leave the job cleaner than we
              found it. That commitment to professionalism is what keeps our customers
              coming back.
            </p>
          </div>

          <div style={{position:"relative",overflow:"hidden",background:"#2a2a2a",minHeight:"320px"}}>
            <Image
              src="/preview_inverted.png"
              alt="Tedwen Remakes LLC service area — Greater Pittsburgh, PA"
              fill
              style={{objectFit:"cover",objectPosition:"center"}}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div style={{position:"absolute",left:"38%",top:"46%",transform:"translate(-50%,-50%)",zIndex:10,width:"10px",height:"10px"}}>
              <div style={{position:"absolute",width:"40px",height:"40px",borderRadius:"50%",background:"rgba(201,169,110,0.12)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} />
              <div style={{position:"absolute",width:"22px",height:"22px",borderRadius:"50%",background:"rgba(201,169,110,0.3)",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} />
              <div style={{width:"10px",height:"10px",borderRadius:"50%",background:"#c9a96e"}} />
            </div>
            <p style={{position:"absolute",bottom:"16px",left:"50%",transform:"translateX(-50%)",zIndex:10,fontSize:"10px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#8a8078",whiteSpace:"nowrap",margin:0}}>
              Greater Pittsburgh, PA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
