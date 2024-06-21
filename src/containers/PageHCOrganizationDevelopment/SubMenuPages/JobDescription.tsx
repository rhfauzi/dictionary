import { Col, Divider, Row } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'

const JobDescription = ({ data }) => {
  return (
    <Spacer>
      <Spacer size={30} />
      <Col>
        <Spacer>
          <Text variant="footer" color="grey.light">
            Job Title
          </Text>
          <Text>{data?.job_title ? data?.job_title : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Objective
          </Text>
          <Text>{data?.objective ? data?.objective : '-'}</Text>
        </Spacer>
        <Divider type="horizontal" style={{ width: '100%', margin: `2rem 0rem` }} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Responsibilities
          </Text>
          <Text>{data?.responsibilities ? data?.responsibilities : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Objective
          </Text>
          <Text>{data?.objective ? data?.objective : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Key Performance Indicator
          </Text>
          <Text>-</Text>
        </Spacer>
        <Divider type="horizontal" style={{ width: '100%', margin: `2rem 0rem` }} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Qualifications and Requirements
          </Text>
          <Text>{data?.qualifications ? data?.qualifications : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Experience
          </Text>
          <Text>{data?.experience ? data?.experience : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Education
          </Text>
          <Text>{data?.education ? data?.education : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
        <Spacer>
          <Text variant="footer" color="grey.light">
            Working Conditions
          </Text>
          <Text>{data?.working_conditions ? data?.working_conditions : '-'}</Text>
        </Spacer>
        <Spacer size={50} />
      </Col>
    </Spacer>
  )
}

export default JobDescription
