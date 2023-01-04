import { useEffect, useState } from "react"
import { Badge } from "react-bootstrap"

export default function BadgeStatus(props) {
    if (props.status == 1) {
        return <Badge pill bg="success" className='float-end'>&nbsp;</Badge>
    } else {
        return <Badge pill bg="danger" className='float-end'>&nbsp;</Badge>
    }
}