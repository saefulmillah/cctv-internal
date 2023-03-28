import '../style/style.css'
import { useEffect, useState } from "react"
import { API_URL, ANT_URL, LOC_ANT_URL, SSL_ANT_URL, HKTOLL_URL, SSL_HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import { Container, Row, Col, Card, ListGroup, Button, Badge, Placeholder } from "react-bootstrap"
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
    const [isLoading, setLoading] = useState(false)
    const [isPlaying, setPlaying] = useState(true)

    const handleShow = function (link, cctvName) {
        setPlaying(true)
        setDataPlayer({
            url: link,
            name: cctvName
        })
    }

    // handle click ruas, show list cctv
    const handleClick = function (id_ruas, nama_ruas) {
        setDataRuas(nama_ruas)
        setLoading(true)
        setPlaying(false)
        setDataPlayer({
            url: null,
            name: 'Silahkan pilih CCTV'
        })
        axios.get(SSL_HKTOLL_URL + "allcctv/" + id_ruas, {
            headers: {
                'Access-Control-Allow-Origin': true,
            },
        }).then(response => {
            setLoading(false)
            setDataCctv(response.data.cctv)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    // calculate total cctv, online, offline
    let TotalOffline = 0
    let TotalOnline = 0
    let TotalCctv = 0
    dataCctv.map((result, index) => {
        if (result.is_active == 0) {
            TotalOffline += 1
        } else {
            TotalOnline += 1
        }
        TotalCctv += 1
    })

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
                                        playing={isPlaying}
                                        muted={true}
                                        width="100%"
                                        height="100%"
                                        config={{
                                            file: {
                                                attributes: {
                                                    crossOrigin: 'true'
                                                },
                                            }
                                        }}
                                        url={dataPlayer.url}
                                    />
                                </Col>
                                {
                                    isLoading === true ? 
                                    <>
                                        <Card.Body className='bg-dark text-white'>
                                            <h4 class="card-title placeholder-glow">
                                                <span class="placeholder col-6"></span>
                                            </h4>
                                            <p class="card-text placeholder-glow">
                                                <span class="placeholder col-1"></span> <span class="placeholder col-2"></span> <span class="placeholder col-2"></span>
                                            </p>
                                        </Card.Body>
                                    </>
                                    :
                                    <>
                                        <Card.Body className='bg-dark text-white'>
                                            <h4>{dataRuas} <small className="text-muted">({dataPlayer.name})</small></h4> Total {TotalCctv} <Badge bg='primary'>Online {TotalOnline}</Badge> <Badge bg='danger'>Offline {TotalOffline}</Badge>
                                        </Card.Body>
                                    </>
                                }
                                
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
                                
                                <Card.Body>
                                    <div className="container-list overflow-auto">
                                        <ListGroup className="list-group-flush">
                                            { isLoading === true ? 
                                                dataCctv.map((result, index) => {
                                                    return (
                                                        <ListGroup.Item
                                                            as="li">
                                                            <div className="d-flex placeholder-glow">
                                                                <div className="p-2 flex-fill">
                                                                    <span class="placeholder float-start col-10"></span>
                                                                    <span class="placeholder float-end col-1"></span>
                                                                </div>
                                                            </div>
                                                        </ListGroup.Item>
                                                    )
                                                })

                                                 : 
                                                
                                                dataCctv.map((result, index) => {
                                                    return (
                                                        <ListGroup.Item
                                                            as="li"
                                                            href={'#link' + result.id}
                                                            onClick={() => handleShow(SSL_ANT_URL + 'LiveApp/streams/' + result.antmedia_id + '.m3u8', result.cctv_name)}>
                                                            <div className="d-flex">
                                                                <div className="p-2 flex-fill">{result.cctv_name}</div>
                                                                <div className="p-2 flex-fill"><BadgeStatusComponent status={result.is_active} /></div>
                                                            </div>
                                                        </ListGroup.Item>
                                                    )
                                                })
                                                
                                            }
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