import '../style/style.css'
import { useEffect, useState } from "react"
import { API_URL, ANT_URL, HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap"
export default function CctvInternal() {
    const [dataPlayer, setDataPlayer] = useState([])
    const [dataCctv, setDataCctv] = useState([])
    const handleShow = function (link, cctvName) {
        setDataPlayer({
            url: link,
            name: cctvName
        })
    }
    useEffect(() => {
        axios.get(HKTOLL_URL + "cctv/3").then(response => {
            // setLoading(false)
            console.log(response.data.cctv)
            setDataCctv(response.data.cctv)
        }).catch(error => {
            console.log(error)
            // setLoading(false)
        })
    }, [])
    return (
        <>
            <div className="bg">
                <Container fluid>
                    <Row>
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
                                    <Card.Title>{dataPlayer.name}</Card.Title>
                                    <Card.Text>
                                        {dataPlayer.url}
                                    </Card.Text>
                                </Card.Body>
                                <div class="container-list overflow-auto">
                                <ListGroup className="list-group-flush">
                                    {dataCctv.map((result, index) => {
                                        return (
                                            <ListGroup.Item action href={'#link'+result.id} onClick={() => handleShow('https://broadcast1.hk-opt.com/LiveApp/streams/'+result.antmedia_id+'.m3u8', result.cctv_name)}>
                                                <div className="d-flex">
                                                    <div className="p-2 flex-fill">{result.cctv_name}</div>
                                                    <div className="p-2 flex-fill"><Badge pill bg="success" className='float-end'>&nbsp;</Badge></div>
                                                </div>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

// export default CctvInternal