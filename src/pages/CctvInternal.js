import '../style/style.css'
import { useEffect, useState } from "react"
import { API_URL, ANT_URL, HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import { Container, Row, Col, Card, ListGroup, Button, Badge } from "react-bootstrap"
import BadgeStatusComponent from '../component/BadgeStatus'

export default function CctvInternal() {
    const namaRuas = [
        { name: 'Ruas JORRS', alias: 'JORRS', value: '2' },
        { name: 'Ruas ATP', alias: 'ATP', value: '1' },
        { name: 'Ruas BAKTER', alias: 'BAKTER', value: '5' },
        { name: 'Ruas TERPEKA', alias: 'TERPEKA', value: '6' },
        { name: 'Ruas PALINDRA', alias: 'PALINDRA', value: '3' },
        { name: 'Ruas MEBI', alias: 'MEBI', value: '4' },
        { name: 'Ruas PERMAI', alias: 'PERMAI', value: '7' },
        { name: 'Ruas SIBANCEH', alias: 'SIBANCEH', value: '8' },
    ]

    const [dataPlayer, setDataPlayer] = useState({
        url: '-',
        name: 'Silahkan pilih CCTV'
    })

    const [dataCctv, setDataCctv] = useState([])
    const [dataRuas, setDataRuas] = useState('')

    const handleShow = function (link, cctvName) {
        setDataPlayer({
            url: link,
            name: cctvName
        })
    }

    const handleClick = function (id_ruas, nama_ruas) {
        setDataRuas(nama_ruas)
        axios.get(HKTOLL_URL + "allcctv/" + id_ruas).then(response => {
            // setLoading(false)
            setDataCctv(response.data.cctv)
        }).catch(error => {
            console.log(error)
            // setLoading(false)
        })
    }

    let TotalOffline = 0
    let TotalOnline = 0
    let TotalCctv = 0

    dataCctv.map((result, index) => {
        if (result.is_active == 0) {
            TotalOffline += 1
            // TotalOffline.push(result.is_active)
        } else {
            TotalOnline += 1
            // TotalOnline.push(result.is_active)
        }
        TotalCctv += 1
    })

    console.log("total Offline ====>", TotalOffline)
    console.log("total Online ====>", TotalOnline)
    console.log("total CCTV ====>", TotalCctv)
    return (
        <>
            <div className="bg g-0">
                <Container fluid className='g-0'>
                    <Row className='g-0'>
                        <Col md={12}>
                            <Card>
                                <Col className="player-wrapper">
                                    <ReactHlsPlayer
                                        className='react-player'
                                        playing
                                        muted={true}
                                        width="100%"
                                        height="100%"
                                        url={dataPlayer.url}
                                    />
                                </Col>
                                <Card.Body className='bg-dark text-white'>
                                    <h4>{dataRuas} <small class="text-muted">({dataPlayer.name})</small></h4> Total {TotalCctv} <Badge bg='primary'>Online {TotalOnline}</Badge> <Badge bg='danger'>Offline {TotalOffline}</Badge>
                                </Card.Body>
                                <Card.Body>
                                    <div className='d-flex flex-wrap'>
                                        {
                                            namaRuas.map((result, index) => {
                                                console.log(result.alias)
                                                return (
                                                    <>
                                                        <div className="p-1">
                                                            <Button variant="outline-primary" size="sm" onClick={() => handleClick(result.value, result.name)} >
                                                                {result.alias}
                                                            </Button>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                    </div>
                                </Card.Body>
                                {/* <Card.Body>
                                    <Card.Title>{dataPlayer.name}</Card.Title>
                                    <Card.Text>
                                        {dataPlayer.url}
                                    </Card.Text>
                                </Card.Body> */}
                                <Card.Body>
                                    <div class="container-list overflow-auto">
                                        <ListGroup className="list-group-flush">
                                            {dataCctv.map((result, index) => {
                                                return (
                                                    <ListGroup.Item 
                                                    as="li"
                                                    href={'#link' + result.id} 
                                                    onClick={() => handleShow('https://broadcast1.hk-opt.com/LiveApp/streams/' + result.antmedia_id + '.m3u8', result.cctv_name)}>
                                                        <div className="d-flex">
                                                            <div className="p-2 flex-fill">{result.cctv_name}</div>
                                                            <div className="p-2 flex-fill"><BadgeStatusComponent status={result.is_active} /></div>
                                                        </div>
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

// export default CctvInternal