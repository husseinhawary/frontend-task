import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";

import  styles from "./card.module.css"

type CardProps = {
    title: string;
    children: React.ReactNode;
    className: string;
};

function Card(props: CardProps) {
    const [activeAccordionIndex, setActiveAccordionIndex] = useState(1);

    const handleAccordionClick = (e: any, titleProps: any) => {
        const { index } = titleProps;
        const newIndex = activeAccordionIndex === index ? -1 : index;
        setActiveAccordionIndex(newIndex);
    };

    const classNames = `${styles.card} ${props.className}`;
    
    return (
        <Accordion className={classNames}>
            <Accordion.Title className={styles["card-title"]} active={activeAccordionIndex === 0} index={0} onClick={handleAccordionClick}>
                <Icon name="dropdown" />
                {props.title}
            </Accordion.Title>
            <Accordion.Content className={styles["card-body"]} active={activeAccordionIndex === 0}>
                <section>{props.children}</section>
            </Accordion.Content>
        </Accordion>
    );
}

export default Card;
