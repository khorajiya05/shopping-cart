import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem'
import {useStoreItemContext} from "../context/StoreItemContext";


export function Store() {
    const {filterItems} = useStoreItemContext();
    return (
        <>
           {filterItems.length !== 0 ?  <Row md={2} xs={1} lg={3} className="g-3">
                {filterItems.map((elem) => {
                    return <Col key={elem.id}><StoreItem {...elem} /></Col>
                })}

            </Row> : <h1 className='col-12 d-flex justify-content-center'>Item not found</h1>}
        </>
    )
}
