import Image from "next/image";

export default function Page() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      <Image
        src="/mantenimiento.png"
        alt="Sitio en mantenimiento"
        fill
        style={{ objectFit: "cover" }}
        pri
