import { Col, Divider, Row } from 'antd'
import moment from 'moment'
import { Spacer, Text } from 'pink-lava-ui'
import {
  ICAtom,
  ICCardPosition,
  ICCostCenter,
  ICCrown,
  ICDate,
  ICDocumentReport,
  ICEmail,
  ICJobTitle,
  ICLegalEntity,
  ICLengthOfService,
  ICLinkedIn,
  ICPlacementLocation,
  ICReportPerson,
  ICStarLink,
  ICUniversity,
} from 'src/assets'
import { COLORS } from 'src/const/COLORS'

const Overview = ({ data }) => {
  const convertDate = (date) => {
    if (date !== '') {
      let newDate = date?.slice(0, 10)
      let resultDate = moment(newDate).format('D MMMM Y')
      return resultDate
    } else {
      return '-'
    }
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Spacer>
      <Spacer>
        <Text variant="headingLarge">Photos Profile</Text>
        <Spacer size={35} />
        <Row>
          <div style={{ borderRadius: '100%', overflow: 'hidden' }}>
            <img
              src={!data?.image_url ? '/hc/images/vacant-default.png' : data?.image_url}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <Spacer size={20} />
          <Spacer>
            <Text
              variant="headingMedium"
              style={{
                color:
                  !data?.employee_name && !data?.is_management_trainee
                    ? COLORS.red.regular
                    : data?.is_management_trainee
                    ? COLORS.green.darker
                    : COLORS.blue.regular,
              }}
            >
              {data ? (data?.employee_name ? data?.employee_name : 'Vacant') : '-'}
            </Text>
            <Row>
              <Text variant="footer">{data?.job_title}</Text>
              <Divider type="vertical" style={{ height: '1rem' }} />
              <Text variant="footer">{data?.company_name !== '' ? data?.company_name : '-'}</Text>
            </Row>
          </Spacer>
        </Row>
      </Spacer>
      <Spacer size={30} />
      <Spacer>
        <Text variant="headingLarge">Employee Information</Text>
        <Spacer size={35} />
        {/* Row 1 */}
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICJobTitle />
              <Col>
                <Text variant="footer">Job Title</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.job_title !== '' ? data?.job_title : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICDate />
              <Col>
                <Text variant="footer">Date of join</Text>
                <Text variant="variantMedium">{convertDate(data?.date_of_join)}</Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICReportPerson />
              <Col>
                <Text variant="footer">Report to</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.report_to !== '' ? data?.report_to : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
        {/* Row 1 */}
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICJobTitle />
              <Col>
                <Text variant="footer">Group, Division or Sub-Division</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.division_name !== '' ? data?.division_name : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICDate />
              <Col>
                <Text variant="footer">Date of Birth</Text>
                <Text variant="variantMedium">{convertDate(data?.date_of_birth)}</Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICCardPosition />
              <Col>
                <Text variant="footer">Position Status</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.position_status !== '' ? data?.position_status : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
        {/* Row 1 */}
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICCostCenter />
              <Col>
                <Text variant="footer">Cost Center</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.cost_center !== '' ? data?.cost_center : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICLengthOfService />
              <Col>
                <Text variant="footer">Length Of Service</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.length_of_service !== '' ? data?.length_of_service : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICStarLink />
              <Col>
                <Text variant="footer">Successor/s</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.successor !== '' ? data?.successor : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
        {/* Row 1 */}
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICLegalEntity />
              <Col>
                <Text variant="footer">Legal Entity</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.company_name !== '' ? data?.company_name : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICDocumentReport />
              <Col>
                <Text variant="footer">Job Status</Text>
                <Text variant="variantMedium">
                  {data?.job_status !== '' ? data?.job_status : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICAtom />
              <Col>
                <Text variant="footer">Subordinate/s</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  Anna Doe, Gwen Doe, Lucy Doe
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
        {/* Row 1 */}
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICPlacementLocation />
              <Col>
                <Text variant="footer">Job Placement</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.job_placement !== '' ? data?.job_placement : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICCrown />
              <Col>
                <Text variant="footer">Job Grade</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.job_grade !== '' ? data?.job_grade : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spacer>
      <Spacer size={30} />
      <Spacer>
        <Text variant="headingLarge">Contact Information</Text>
        <Spacer size={35} />
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICEmail />
              <Col>
                <Text variant="footer">Email</Text>
                <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                  {data?.email !== '' ? data?.email : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <Row gutter={10}>
              <ICLinkedIn />
              <Col>
                <Text variant="footer">Social Media Professional</Text>
                <Spacer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {data?.social_media?.map((item) => (
                    <Text variant="variantMedium" style={{ color: COLORS.blue.regular }}>
                      -{' '}
                      <a href={item.url} target="_blank">
                        {capitalizeFirstLetter(item.type)}
                      </a>
                    </Text>
                  ))}
                </Spacer>
              </Col>
            </Row>
          </Col>
        </Row>
        <Spacer size={40} />
      </Spacer>
      <Spacer size={30} />
      <Spacer>
        <Text variant="headingLarge">Education Information</Text>
        <Spacer size={35} />
        <Row>
          <Col lg={8}>
            <Row gutter={10}>
              <ICUniversity />
              <Col>
                <Text variant="footer">University</Text>
                <Text variant="variantMedium">
                  {data?.university !== '' ? data?.university : '-'}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spacer>
      <Spacer size={50} />
    </Spacer>
  )
}

export default Overview
