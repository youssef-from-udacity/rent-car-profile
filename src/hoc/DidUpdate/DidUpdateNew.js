import React, { useEffect, useRef } from 'react';


export default function InputWithIcon(props) {

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            props.componentUpdated()
        }
    });

    return (

        <>
            {props.children}
        </>

    );
}
