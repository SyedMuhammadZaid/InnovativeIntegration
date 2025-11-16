'use client';

import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { getBlog } from "@/utils/apis/blog";
import { renderTiptapContent } from "@/utils/renderHtml";
import { useEffect, useState } from "react";

export default function BlogDetail({ params }: { params: { id: string } }) {

    const { id } = params;
    const idAsNumber = Number(id);
    const { showLoader, hideLoader } = useLoader();
    const [blog, setBlog] = useState<any>(null);
    const [blogMetaData, setBlogMetaData] = useState<any>(null)
    console.log("blog", blog)

    useEffect(() => {
        if (idAsNumber) {
            (async () => {
                try {
                    showLoader()
                    let res: any = await getBlog({ id: idAsNumber });
                    if (res?.success) {
                        if(res?.data?.description) setBlog(renderTiptapContent(res?.data?.description?.content));
                        setBlogMetaData({ title: res?.data?.previewHeading })
                    }
                } catch (error) {
                    console.log(error)
                }
                finally {
                    hideLoader()
                }
            })()
        }
    }, [id])

    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title={blogMetaData?.title ?? '-'} content="Explore the latest insights in Cyber Security, Data Management, and Emerging Tech." />
            <section className="container py-6! flex flex-col gap-8">
                <div className="bg-[#e4e4eb] p-7 rounded-xl">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog }}
                    />
                </div>
            </section>
        </section >
    )
}