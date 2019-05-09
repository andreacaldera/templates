import React, { memo } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

type HomeProps = {}

const Component = memo(({  }: HomeProps) => {
  return (
    <Container>
      <Row>
        <Col lg={{ size: 6, offset: 3 }} md={{ size: 12 }}>
          Welcome to the home page
        </Col>
      </Row>
    </Container>
  )
})

export const Home = connect(
  null,
  {},
)(Component)
