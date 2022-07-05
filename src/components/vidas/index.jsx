import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Vidas(props) {
    return (
        <Ionicons name={props.coracao === true ? "md-heart-sharp" : "heart-outline"}
            size={24} color={"red"} />
    )
}