import React from 'react'
import { Modal, Button } from 'reactstrap'
import ModalHeader from 'reactstrap/lib/ModalHeader'
import ModalBody from 'reactstrap/lib/ModalBody'
import ModalFooter from 'reactstrap/lib/ModalFooter'
import { sendAction } from '../../utils/actionDispatcher'
import { yoDawgHeardYouLikeModals } from '../../utils/actions'

export function ErrorModal(props: { isOpen: boolean; message: string }) {
  const {message, isOpen} = props;
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Error</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <img width="200px" height="100px" src="http://www.quickmeme.com/img/bd/bda8e1e572d670106750355ca6b0601cf04b284e12d9f70cfbe81355e5d4cdd8.jpg"></img>
      <ModalFooter>
        <Button onClick={() => closeModal(isOpen)}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

function closeModal(isOpen: boolean) {
  sendAction(yoDawgHeardYouLikeModals, {isOpen, message: ''})
}