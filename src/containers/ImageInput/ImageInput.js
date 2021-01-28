import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CarAvatar } from '../Tabs/CustomIcons';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';




const readFileAsDataURL = (file) =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(resolve => {
    const image = new Image()

    image.onload = () => {
      const context = canvas.getContext('2d')

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height
        image.height = maxHeight
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = image.width
      canvas.height = image.height

      context.drawImage(image, 0, 0, image.width, image.height)

      resolve(canvas.toDataURL('image/jpeg'))
    }

    image.src = imageURL
  })

/**
 * A custom <input> that dynamically reads and resizes image files before
 * submitting them to the server as data URLs. Also, shows a preview of the image.
 */
const ImageInput = React.forwardRef(function ImageInput(props, ref) {
  const [state, setState] = useState({
    value: ""
  })
  const [canvas, SetCanvas] = useState(null)
  const { name } = props
  const { value } = state
  
  const useStyles = makeStyles({
    root: {
      backgroundImage: `url("${value}")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width: '100%',
      height: '160px',
      '& .MuiInput-underline': {
        height: '100%',
        '& .MuiInput-input': {
          height: '100%',
          cursor: 'pointer'
        },

      },
    },
    inputWrapper: {
      position: 'absolute',
      top: '-20px',
      left: 0,
      width: '100%',
      height: 'calc(100% + 20px)',
      opacity: 0,
      cursor: 'pointer',
      zIndex: 1
    },
    fab: {
      position: "absolute",
      bottom: 0,
      right: 0,
      margin: "5px",
      zIndex: 0
    },
  })
  const classes = useStyles()

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then(originalURL => {
        resizeImage(originalURL, canvas, props.maxHeight).then(url => {
          setState({ value: url })
        })
      })
    } else {
      setState({ value: '' })
    }
  }

  useEffect(() => {
    SetCanvas(document.createElement('canvas'))
  }, [])


  const avatarIcon = (<CarAvatar />)
  return (

    <div className={classes.root}>
      {!value ? avatarIcon : null}
      <TextField type="hidden" name={name} value={value} />
      <TextField
        type="file"
        onChange={handleFileChange}
        className={classes.inputWrapper}
      />
      <Fab className={classes.fab} component="div" color="default" aria-label="add">
        <PublishIcon />
      </Fab>
    </div>
  )
})

ImageInput.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  maxHeight: PropTypes.number
}
export default ImageInput;

