import { Col, Row } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'
import {
  ICEmergencyContactName,
  ICEmergencyContactNumber,
  ICJobTitle,
  ICRelationship
} from 'src/assets'
import { COLORS } from 'src/const/COLORS'

const EmergencyContact = ({ data }) => {
  return (
    <Spacer>
      <Spacer size={30} />
      {data?.map((contactItem, index) => (
        <Row gutter={20}>
          <Col
            lg={8}
            style={{
              borderRight: index !== 0 && index !== 2 ? `0.05rem solid ${COLORS.grey.lighter}` : '',
            }}
          >
            <Text variant="headingMedium">1st Contact</Text>
            <Spacer size={20} />
            <Col>
              <Row gutter={10}>
                <Row
                  style={{ width: 40, height: 40, display: 'flex' }}
                  justify="center"
                  align="middle"
                >
                  <ICEmergencyContactName />
                </Row>
                <Col>
                  <Text variant="footer">Emergency Contact Name</Text>
                  <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                    {contactItem?.contact_name}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Spacer size={40} />
            <Col>
              <Row gutter={10}>
                <Row
                  style={{ width: 40, height: 40, display: 'flex' }}
                  justify="center"
                  align="middle"
                >
                  <ICRelationship />
                </Row>
                <Col>
                  <Text variant="footer">Relationship</Text>
                  <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                    {contactItem?.relationship}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Spacer size={40} />
            <Col>
              <Row gutter={10}>
                <Row
                  style={{ width: 40, height: 40, display: 'flex' }}
                  justify="center"
                  align="middle"
                >
                  <ICEmergencyContactNumber />
                </Row>
                <Col>
                  <Text variant="footer">Emergency Contact Number</Text>
                  <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                    {contactItem?.contact_number}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Spacer size={40} />
            <Col>
              <Row gutter={10}>
                <Row
                  style={{ width: 40, height: 40, display: 'flex' }}
                  justify="center"
                  align="middle"
                >
                  <ICJobTitle />
                </Row>
                <Col>
                  <Text variant="footer">Contact Address</Text>
                  <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                    {contactItem?.contact_address}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Col>
        </Row>
      ))}

      <Spacer size={50} />
    </Spacer>
  )
}

export default EmergencyContact
