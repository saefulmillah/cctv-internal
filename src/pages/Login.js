import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from "react"
import { Alert, Button, Figure, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import Logo from '../assets/jtts_logo.png'
import '../style/sign-in.css'

export default function Login() {

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Tidak boleh kosong')
            .min(3, 'Password harus lebih dari 3 karakter'),
        email : Yup.string()
            .required('Tidak boleh kosong')
    })

    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false))
    const [ruasSelected, setRuasSelected] = useState('')
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const users = [
        { username: "Bakter2023", password: "Lebaran2023", value: '5' },
        { username: "Permai2023", password: "Lebaran2023", value: '7' },
    ]

    const namaRuas = [
        { name: 'Pilih Ruas', alias: 'null', value: '0'},
        { name: 'Ruas JORRS', alias: 'JORRS', value: '2' },
        { name: 'Ruas ATP', alias: 'ATP', value: '1' },
        { name: 'Ruas BAKTER', alias: 'BAKTER', value: '5' },
        { name: 'Ruas TERPEKA', alias: 'TERPEKA', value: '6' },
        { name: 'Ruas PALINDRA', alias: 'PALINDRA', value: '3' },
        { name: 'Ruas MEBI', alias: 'MEBI', value: '4' },
        { name: 'Ruas PERMAI', alias: 'PERMAI', value: '7' },
        { name: 'Ruas SIBANCEH', alias: 'SIBANCEH', value: '8' },
        { name: 'Ruas BINSA', alias: 'BINSA', value: '9' }
    ]

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const [selected, setSelected] = useState(null)

    const handleChange = (selectedOption) => {
        setSelected(selectedOption)
    }
    
    function onSubmit(data) {
        
        const postData = {
            email : data.email,
            password : data.password,
            ruas : selected.target.value
        }
        
        const account = users.find((dataAccount) => dataAccount.username === data.email)
        const password = account.password == data.password
        const ruas = account.value == selected.target.value

        if (account && password && ruas) {
            setauthenticated(true)
            setRuasSelected(selected.target.value)
            setShow(false)
            localStorage.setItem("authenticated", true)
            localStorage.setItem("ruasSelected", selected.target.value)
            console.log("is otentifikasi ok?", localStorage.getItem("authenticated"))
            console.log("ruas terpilih?", localStorage.getItem("ruasSelected"))
            navigate('/cctv/grid')
        } else {
            setauthenticated(false)
            setRuasSelected(0)
            setShow(true)
            localStorage.setItem("authenticated", false)
            localStorage.setItem("ruasSelected", 0)
            console.log("is otentifikasi ok?", localStorage.getItem("authenticated"))
            console.log("ruas terpilih?", localStorage.getItem("ruasSelected"))
            navigate('/login')
        }

        return false
    }

    console.log("is true?", localStorage.getItem("authenticated"))
    if (localStorage.getItem("authenticated")) {
        return <Navigate replace to="/cctv/grid" />
    } else {
        return (
            <>
                <main className='form-signin w-100 m-auto text-center'>
                    <Alert show={errors.email != undefined || errors.password != undefined ? true : false} variant="warning">
                        <Alert.Heading>Warning.</Alert.Heading>
                        <p>
                            Email : {errors.email?.message}<br />
                            Password : {errors.password?.message}
                        </p>
                    </Alert>
                    <Alert show={show} variant="danger">
                        <Alert.Heading>Warning.</Alert.Heading>
                        <p>Anda tidak mempunyai akses untuk Ruas Tol tersebut.</p>
                    </Alert>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Figure>
                            <Figure.Image
                                width={100}
                                height={100}
                                alt='logo-hk'
                                src={Logo}
                            />
                        </Figure>
                        <h1 className='h3 mb-3'>Please sign in</h1>

                        <div class="form-floating">
                            <Form.Control name='email' className='form-control' id='floatingInput' placeholder="Email" {...register('email')} />
                            <label for="floatingInput">Username</label>
                        </div>
                        <div class="form-floating">
                            <Form.Control type="password" name='password' className='form-control' id='floatingPassword' placeholder="Password" {...register('password')} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="">
                            <Form.Control as={'select'} onChange={handleChange}>
                                {
                                    namaRuas.map((result, index) => {
                                        return (
                                            <>
                                                <option value={result.value}>{result.name}</option>
                                            </>
                                        )
                                    })
                                }
                            </Form.Control>
                        </div>

                        <Button size="md" className='w-100 mt-3' as="input" type="submit" value="Login" />
                        <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                    </Form>
                </main>
            </>
        ) 
    }
}