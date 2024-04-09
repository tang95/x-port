import React, {useEffect, useRef} from "react";
import {Timeline} from "vis-timeline/standalone";
import {DataGroupCollectionType, DataItemCollectionType, TimelineOptions} from "vis-timeline";
import moment from "moment";

export type Props = {
    component: API.Component
}
export default (props: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<Timeline | null>(null);

    const items: DataItemCollectionType = [
        {id: 1, start: "2024-04-08T12:20:00", type: "point", group: 2},
        {id: 2, start: "2024-04-08T13:30:00", type: "point", group: 3},
        {id: 3, start: "2024-04-08T14:10:00", type: "point", group: 2},
        {id: 4, start: "2024-04-08T15:30:00", type: "point", group: 3},
        {id: 5, start: "2024-04-08T16:40:00", type: "point", group: 2},
        {id: 6, start: "2024-04-08T17:50:00", type: "point", group: 4},
        {id: 7, start: "2024-04-08T13:30:00", end: "2024-04-08T14:30:00", type: "range", group: 2},
        {id: 8, start: "2024-04-08T17:50:00", type: "point", group: 4},
    ];
    const groups: DataGroupCollectionType = [
        {id : 1, content: "demo-service", nestedGroups: [2, 3, 4]},
        {id : 2, content: "部署"},
        {id : 3, content: "事件"},
        {id : 4, content: "告警"},
        {id : 10, content: "依赖关系", nestedGroups: [11, 12]},
        {id : 11, content: "demo-library", nestedGroups: [22, 23, 24], showNested: false},
        {id : 12, content: "demo-database"},
        {id : 22, content: "部署"},
        {id : 23, content: "事件"},
        {id : 24, content: "告警"},
    ]

    const options: TimelineOptions = {
        width: '100%',
        minHeight: '300px',
        orientation: "top",
        zoomable: false,
        horizontalScroll: true,
        showCurrentTime: true,
        max: moment().add(4, 'hour').toDate(),
        format: {
            minorLabels: {
                millisecond: 'SSS',
                second: 's',
                minute: 'HH:mm',
                hour: 'HH:mm',
                weekday: 'ddd D',
                day: 'D',
                week: 'w',
                month: 'MMM',
                year: 'YYYY'
            },
            majorLabels: {
                millisecond: 'HH:mm:ss',
                second: 'YYYY-MM-D HH:mm',
                minute: 'YYYY-MM-D',
                hour: 'YYYY-MM-D',
                weekday: 'YYYY-MM',
                day: 'YYYY-MM',
                week: 'YYYY-MM',
                month: 'YYYY',
                year: ''
            }
        },
    }

    useEffect(() => {
        if (!containerRef.current) return;
        timelineRef.current = new Timeline(containerRef.current, items, groups, options)
        timelineRef.current.setWindow(moment().subtract(12, 'hour'), moment().add(1, 'hour'));
    }, [containerRef]);

    return <div ref={containerRef}/>
}
