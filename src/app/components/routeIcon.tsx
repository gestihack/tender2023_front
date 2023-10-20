import { FunctionComponent } from "react"
import Image from "next/image"
import Link from "next/link"

interface RouteIconProps {
    icon: string
    title: string
    to: string
}

const RouteIcon: FunctionComponent<RouteIconProps> = (props) => {
    return (
        <Link href={props.to} className="routeIcon flex flex-col px-3 py-4 gap-y-2 hover:!border-b-2 border-cyan-500">
            <div>
                <Image
                    alt={props.title}
                    width={30}
                    height={30}
                    src={props.icon}
                />
            </div>
            <span className="">{props.title}</span>
        </Link>
    )
}

export default RouteIcon
