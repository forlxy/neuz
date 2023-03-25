import styled from 'styled-components'

import { SlotModel, SlotType, slotTypes, SLOT_SIZE_PX, translateDesc, translateType } from '../models/BotConfig'

type Props = {
    className?: string,
    type: SlotType,
    index: number,
    indexName: string,
    onChange?: (type: SlotType) => void,
    toggleSlotModal: (event:any,targetSlot: SlotModel) => void,
    slot: SlotModel,
}

const Slot = ({ className, type = 'Unused', index, onChange, toggleSlotModal, indexName,slot }: Props) => {
    const handleChange = () => {
        const nextType: SlotType = slotTypes[(slotTypes.indexOf(type) + 1) % slotTypes.length];
        onChange?.(nextType)
    }
    const symbolOrIcon = translateType(type)
    const useIcon = symbolOrIcon.startsWith('data:') || symbolOrIcon.includes('static');
    var styleInline = {border: '1px solid hsl(48,58%,43%)'};
    if(slot){
        if(slot.slot_type != "Unused"){
            styleInline = slot.slot_enabled === true ? {border: '1px solid green'} : {border: '1px solid red'};
        }
    }
    // const styleClassName = slot.slot_enabled === true ? 'enabled_slot' : 'disabled_slot'
    return (

        <div style={styleInline} className={className} onClick={(e) => toggleSlotModal(e,slot)} >
            <div className="index">{indexName}</div>
            <div className='slot' onClick={handleChange}>
                {useIcon && (
                    <img className="type" src={symbolOrIcon} alt="Slot icon" />
                )}
                {!useIcon && (
                    <div className="type">{translateType(type)[0]}</div>
                )}
                <div className="desc">{translateDesc(type)[0]}</div>
            </div>
        </div>
    )
}

export default styled(Slot)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${SLOT_SIZE_PX}px;
    height: ${SLOT_SIZE_PX}px;
    background-color: hsla(0,0%,100%,.05);
    border: 1px solid hsl(48,58%,43%);
    border-radius: .25rem;
    position: relative;
    margin-top: .5rem;
    cursor: pointer;

    &:first-child {
        order: 1 !important;
    }

    &:hover {
        background-color: hsla(0,0%,100%,.1);
        border: 1px solid hsl(48,65%,50%);
    }

    & .slot {
        height:100%;
        width: 100%;
        text-align: center;
    }

    & .enabled_slot {
        border: 1px solid green;
    }

    & .disabled_slot {
        border: 1px solid red;
    }

    & .index {
        position: absolute;
        top: calc(-${SLOT_SIZE_PX / 3}px - 0.2rem);
        width: 100%;
        text-align: center;
        font-size: 0.75rem;
        color: hsl(48,75%,75%);
        text-shadow: 0 0 4px black;
    }

    & .desc {
        position: absolute;
        bottom: calc(-${SLOT_SIZE_PX / 3}px - 0.1rem);
        width: 100%;
        text-align: center;
        font-size: .75rem;
        color: hsl(48,75%,75%);
        text-shadow: 0 0 4px black;
    }

    & div.type {
        color: white;
        font-size: 1.5rem;
    }

    & img.type {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: .25rem;
        border-radius: .25rem;
    }
`
