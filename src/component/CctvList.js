import { useEffect, useState } from "react"
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap"

export default function CctvList(props) {
    return (
        <>
            <div class="container-list overflow-auto">
                <ListGroup className="list-group-flush">
                    {props.dataCctv.map((result, index) => {
                        return (
                            <ListGroup.Item action href={'#link' + result.id} onClick={() => handleShow('https://broadcast1.hk-opt.com/LiveApp/streams/' + result.antmedia_id + '.m3u8', result.cctv_name)}>
                                <div className="d-flex">
                                    <div className="p-2 flex-fill">{result.cctv_name}</div>
                                    <div className="p-2 flex-fill"><BadgeStatusComponent status={0} /></div>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </>
    )
}