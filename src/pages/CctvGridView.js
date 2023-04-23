import axios from 'axios'
import React, { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ReactHlsPlayer from 'react-player/lazy'
import { useParams } from 'react-router'
import { Navigate } from "react-router-dom"
import CctvModal from '../component/CctvModal'
import '../style/style.css'
import { SSL_ANT_URL, SSL_HKTOLL_URL, SSL_ANT_URL_EXT } from '../utils/constants'

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
    const [show, setShow] = useState(false)
    const [dataModal, setDataModal] = useState([])
    const id_ruas = localStorage.getItem("ruasSelected")
    const params = useParams()
    const [authenticated, setauthenticated] = useState(false);
    // get url params
    let uri_offset = params.offset
    let uri_limit = 9
    let Paging = []
    let PagingInfo = []
    let PageLength = []

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = (cctv_name, cctv_url) => {
        setShow(true)
        setDataModal({
            cctv_name: cctv_name,
            cctv_url: cctv_url,
        })
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        }
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
        let offset = i * 9
        let limit = (i + 1) * 9
        Paging.push(<li class="page-item"><a class="page-link" href={"/cctv/grid/" + offset + "/" + limit}>{i + 1}</a></li>)
    }
    console.log("is otentifikasi ok dashboard?", localStorage.getItem("authenticated"))

    if (localStorage.getItem("authenticated")=='false') {
            return <Navigate replace to="/login" />
    } else if (localStorage.getItem("authenticated")==null) {
        return <Navigate replace to="/login" />
    } else {
        return (
            <>
                <Container fluid className='g-0'>
                    <Row className='row-cols-3 g-0'>
                        {
                            dataCctv.map((result, index) => {
                                return (
                                    result.is_active == 1 ?
                                        <>
                                            <Col>
                                                <Card>
                                                    <Col className="player-wrapper" onClick={() => handleShow(result.cctv_name, SSL_ANT_URL_EXT + 'LiveApp/streams/' + result.antmedia_id + '.m3u8')}>
                                                        <div className='player-title'>{result.cctv_name}</div>
                                                        <ReactHlsPlayer
                                                            className='react-player'
                                                            playing={true}
                                                            muted={true}
                                                            controls={false}
                                                            width="100%"
                                                            height="100%"
                                                            config={{
                                                                file: {
                                                                    attributes: {
                                                                        crossOrigin: 'true'
                                                                    },
                                                                }
                                                            }}
                                                            url={SSL_ANT_URL_EXT + 'LiveApp/streams/' + result.antmedia_id + '.m3u8'}
                                                        />
                                                    </Col>
                                                </Card>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col>
                                                <Card>
                                                    <Col className="player-wrapper-offline">
                                                        <div className='player-title'>{result.cctv_name}</div>
                                                        <ReactHlsPlayer
                                                            className='react-player'
                                                            playing={false}
                                                            muted={true}
                                                            controls={false}
                                                            width="100%"
                                                            height="100%"
                                                            config={{
                                                                file: {
                                                                    attributes: {
                                                                        crossOrigin: 'true'
                                                                    },
                                                                }
                                                            }}
                                                            url=''
                                                        />
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
                <CctvModal
                    show={show}
                    cctv_name={dataModal.cctv_name}
                    cctv_url={dataModal.cctv_url}
                    onClick={handleClose}
                    onHide={handleClose} />
            </>
        )
    }
}