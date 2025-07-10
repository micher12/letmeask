import { ArrowRight } from "lucide-react";

export function Skeleton({type}: {type: "roomsLoading" | null}){

    if(!type) return null;

    if(type === "roomsLoading")
    return(
        <div className="flex items-center justify-between p-3 border rounded-lg bg-zinc-800 w-full animate-pulse" >
            <div className="flex flex-col gap-3">
                <span className="h-4 w-38 block rounded-lg bg-zinc-700 animate-pulse"></span>
                <div className="flex items-center gap-2">
                    <span className="h-4 w-20 block rounded-lg bg-zinc-700 animate-pulse"></span>
                <span className="h-4 w-20 block rounded-lg bg-zinc-700 animate-pulse"></span>
                </div>
            </div>
            <span className="flex items-center gap-1">
                <div className="w-12 h-4 bg-zinc-700 animate-pulse rounded-lg"/>
                <ArrowRight className="size-4 text-sm" />
            </span>
        </div>
    )
}