"use client";

import dynamic from "next/dynamic";
import type { Business } from "../types/database";

const BusinessMap = dynamic(() => import("./BusinessMap"), {
    ssr: false,
});

type Props = {
    businesses: Business[];
    center?: [number, number];
    zoom?: number;
};

export default function DynamicBusinessMap(props: Props) {
    return <BusinessMap {...props} />;
}
