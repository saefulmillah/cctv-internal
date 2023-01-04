import '../style/style.css'
import { useEffect, useState } from "react"
import { API_URL, ANT_URL, HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap"
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

    const handleShow = function (link, cctvName) {
        setDataPlayer({
            url: link,
            name: cctvName
        })
    }

    const handleClick = function (id_ruas) {
        axios.get(HKTOLL_URL + "allcctv/" + id_ruas).then(response => {
            // setLoading(false)
            console.log(response.data.cctv)
            setDataCctv(response.data.cctv)
        }).catch(error => {
            console.log(error)
            // setLoading(false)
        })
    }

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
                                <Card.Body>
                                    <div className='d-flex flex-wrap'>
                                        {
                                            namaRuas.map((result, index) => {
                                                console.log(result.alias)
                                                return (
                                                    <>
                                                        <div className="p-1">
                                                            <Button variant="outline-primary" onClick={() => handleClick(result.value)} >
                                                                {result.alias}
                                                            </Button>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title>{dataPlayer.name}</Card.Title>
                                    <Card.Text>
                                        {dataPlayer.url}
                                    </Card.Text>
                                </Card.Body>
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