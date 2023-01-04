import axios from "axios";
import { Col, Button } from "react-bootstrap"
import { HKTOLL_URL } from "../utils/constants";

export default function PilihRuas() {
    const namaRuas = [
        { name: 'Ruas ATP', alias: 'ATP', value: '2' },
        { name: 'Ruas BAKTER', alias: 'BAKTER', value: '3' },
        { name: 'Ruas TERPEKA', alias: 'TERPEKA', value: '4' },
        { name: 'Ruas PALINDRA', alias: 'PALINDRA', value: '5' },
        { name: 'Ruas MEBI', alias: 'MEBI', value: '6' },
        { name: 'Ruas PERMAI', alias: 'PERMAI', value: '7' },
        { name: 'Ruas SIBANCEH', alias: 'SIBANCEH', value: '8' },
        { name: 'Ruas BINBAT', alias: 'BINBAT', value: '9' },
    ];

    const handleClick = async (id_ruas) => {
        const [r1] = await Promise.all(
            axios.get(HKTOLL_URL + "cctv/" + id_ruas)
        )
    }

    return (
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
        })
    )
}