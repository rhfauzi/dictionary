import { Lozenge } from 'pink-lava-ui'
import { removeSpecialCharsAndTitleCase } from 'src/utils/generalUtils'
import { tagColorsV2 as tagColors } from 'src/configs/tagColor'

type TaggedStatusProps = {
  status: string
  size?: string
}

const TaggedStatus: React.FC<TaggedStatusProps> = ({ status, size }) => {
  let variantTag: object = { backgroundColor: '', color: '' }
  let touchChar: string

  if (status) {
    touchChar = removeSpecialCharsAndTitleCase(status)
    switch (true) {
      case tagColors.green.includes(touchChar):
        variantTag = { backgroundColor: '#ABFFDC', color: '#01874E' }
        break
      case tagColors.greenlighter.includes(touchChar):
        variantTag = { backgroundColor: '#E2FFF3', color: '#01A862' }
        break
      case tagColors.pink.includes(touchChar):
        variantTag = { backgroundColor: '#FDE6F3', color: '#BC006F' }
        break
      case tagColors.red.includes(touchChar):
        variantTag = { backgroundColor: '#FFE4E5', color: '#ED1C24' }
        break
      case tagColors.yellow.includes(touchChar):
        variantTag = { backgroundColor: '#FFE964', color: '#444444' }
        break
      case tagColors.waferblue.includes(touchChar):
        variantTag = { backgroundColor: '#F4FBFC', color: '#2BBECB' }
        break
      case tagColors.cheese.includes(touchChar):
        variantTag = { backgroundColor: '#FFFBDF', color: '#B78101' }
        break
      case tagColors.black.includes(touchChar):
        variantTag = { backgroundColor: '#F4F4F4', color: '#000000' }
        break
      case tagColors.greycheese.includes(touchChar):
        variantTag = { backgroundColor: '#F4F4F4', color: '#666666' }
        break
      case tagColors.gogumapurple.includes(touchChar):
        variantTag = { backgroundColor: '#F6E6FD', color: '#8B00BC' }
        break
      default:
        variantTag = { backgroundColor: '#F4F4F4', color: '#666666' }
        break
    }
  }

  return (
    status ? (
      <Lozenge size={size} style={{ ...variantTag, fontWeight: 'bold' }}>
        {touchChar}
      </Lozenge>
    ) : '-'
  )
}

export default TaggedStatus
