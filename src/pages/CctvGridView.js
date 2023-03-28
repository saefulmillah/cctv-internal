import '../style/style.css'
import React, { useEffect, useState } from "react"
import { API_URL, ANT_URL, LOC_ANT_URL, SSL_ANT_URL, HKTOLL_URL, SSL_HKTOLL_URL, LOC_HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'

export default function CctvGridView() {
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
    const [dataRuas, setDataRuas] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isPlaying, setPlaying] = useState(true)
    const [dataPaging, setPaging] = useState([])
    const [dataTotalPage, setTotalPage] = useState([])

    const id_ruas = 7
    const params = useParams()
    // get url params
    let uri_offset = params.offset
    let uri_limit = params.limit
    let Paging = []
    let PagingInfo = []
    let PageLength = []

    useEffect(() => {
        // get info cctv by branch
        axios.get(SSL_HKTOLL_URL + "infocctv/" + id_ruas, {
        }).then(response => {
            setDataRuas(response.data.cctv)
        }).catch(error => {
            console.log(error)
        })

        // get cctv by paging
        if (uri_limit !== undefined && uri_limit !== null) {
            console.log("offset dan limit", uri_offset + " " + uri_limit)
            // get all cctv unit
            axios.get(SSL_HKTOLL_URL + "cctv/page/" + id_ruas + "/" + uri_offset + "/" + uri_limit, {
                headers: {
                    'Access-Control-Allow-Origin': true,
                },
            }).then(response => {
                setDataCctv(response.data.cctv)
            }).catch(error => {
                console.log(error)
            })
        } else {
            console.log("tidak ada paging")
        }
    }, [])


    dataRuas.map((result, index) => {
        // console.log(index)
        if (result.total_page !== null) {
            PageLength.push(result.total_page)
            // console.log("total_page", result.total_page)
        } else {
            // console.log("total_cctv", result.total_cctv)
        }
    })

    for (let i = 0; i <= PageLength[0]; i++) {
        let offset = i * 25
        let limit = (i + 1) * 25
        Paging.push(<li class="page-item"><a class="page-link" href={"/cctv/grid/" + offset + "/" + limit}>{i + 1}</a></li>)
    }


    return (
        <>

            <Container fluid className='g-0'>
                <Row className='row-cols-5 g-0'>
                    {
                        dataCctv.map((result, index) => {
                            return (
                                result.is_active == 1 ?
                                    <>
                                        <Col>
                                            <Card>
                                                <Col className="player-wrapper">
                                                    <ReactHlsPlayer
                                                        className='react-player'
                                                        playing={false}
                                                        muted={true}
                                                        controls={true}
                                                        width="100%"
                                                        height="100%"
                                                        config={{
                                                            file: {
                                                                attributes: {
                                                                    crossOrigin: 'true'
                                                                },
                                                            }
                                                        }}
                                                        url={SSL_ANT_URL + 'LiveApp/streams/' + result.antmedia_id + '.m3u8'}
                                                    />
                                                </Col>
                                            </Card>
                                        </Col>
                                    </>
                                    :
                                    <>
                                        <Col>
                                            <Card className=''>
                                                <Col className="player-wrapper-offline">
                                                    <div className="react-player-offline">
                                                        Offline
                                                    </div>
                                                </Col>
                                            </Card>
                                        </Col>
                                    </>
                            )
                        })
                    }
                </Row>
                <div class="fixed-bottom">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link">Page : </a>
                            </li>
                            {Paging}
                        </ul>
                    </nav>
                </div>
            </Container>
        </>
    )
}