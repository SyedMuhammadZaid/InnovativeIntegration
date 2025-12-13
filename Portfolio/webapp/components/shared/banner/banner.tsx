export default function Banner({ title, content }: { title: string, content: string }) {
    return (
        <section className="w-full border banner-bg px-[20px] py-14 flex items-center justify-center flex-col gap-4">
            <h1 className="text-white text-4xl font-semibold tracking-wider text-center max-w-[900px]">{title}</h1>
            <p className="text-[#80829A] max-w-[700px] text-center">{content}</p>
        </section>
    )
}