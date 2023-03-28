import '../style/style.css'
import React, { useEffect, useState } from "react"
import { API_URL, ANT_URL, LOC_ANT_URL, SSL_ANT_URL, HKTOLL_URL, SSL_HKTOLL_URL, LOC_HKTOLL_URL } from '../utils/constants'
import axios from 'axios'
import ReactHlsPlayer from 'react-player/lazy'
import {Container, Row, Col, Nav, Navbar, NavDropdown, Button, Card, Modal } from 'react-bootstrap'

export default function CctvModal(props) {
    return (
        <>
            <Modal 
                show={props.show} 
                onHide={() => props.onHide()} 
                fullscreen={false} 
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className="modal-header text-white bg-dark">
                    <Modal.Title>{props.cctv_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-bg bg-dark">
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Col className="player-wrapper">
                                                <div className='player-title'>{props.cctv_name}</div>
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
                                                    url={props.cctv_url}
                                                />
                                            </Col>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}
