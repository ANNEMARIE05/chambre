"use client"

import { useRouter } from "next/navigation";
import { use } from "react";

export default function CommandeDetail({ params }) {
    const router = useRouter();
    const {id} = use(params);
    return(
        <> {id} </>
    )
}