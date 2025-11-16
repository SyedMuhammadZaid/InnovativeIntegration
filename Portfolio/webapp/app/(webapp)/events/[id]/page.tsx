'use client';

import Banner from "@/components/shared/banner/banner";
import { useLoader } from "@/components/shared/loadingContext/loaderContext";
import { getEvent } from "@/utils/apis/event";
import { renderTiptapContent } from "@/utils/renderHtml";
import { useEffect, useState } from "react";

export default function EventDetail({ params }: { params: { id: string } }) {

    const { id } = params;
    const idAsNumber = Number(id);
    const { showLoader, hideLoader } = useLoader();
    const [event, setEvent] = useState<any>(null);
    const [eventMetaData, setEventMetaData] = useState<any>(null)

    useEffect(() => {
        if (idAsNumber) {
            (async () => {
                try {
                    showLoader()
                    let res: any = await getEvent({ id: idAsNumber });
                    if (res?.success) {
                        if (res?.data?.detailedContent) setEvent(renderTiptapContent(res?.data?.detailedContent?.content));
                        setEventMetaData({ title: res?.data?.title })
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
    console.log("eventMetaData", eventMetaData)
    return (
        <section className="flex flex-col gap-3 justify-start min-h-screen bg-[#F2F2F5]">
            <Banner title={eventMetaData?.title ?? '-'} content="Events for innovators and changemakers." />
            <section className="container py-6! flex flex-col gap-8">
                <div className="bg-[#e4e4eb] p-7 rounded-xl">
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: event }}
                    />
                </div>
            </section>
        </section >
    )
}