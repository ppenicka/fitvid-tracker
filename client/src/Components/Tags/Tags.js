import React from 'react';
import ChipInput from 'material-ui-chip-input';
import Typography from '@material-ui/core/Typography';

function Tags ({tags, setTags, editable}) {
  return (
  <div>
  <Typography variant='body1' style={{ fontWeight: 'bold' }}>Tags:</Typography>
    <ChipInput defaultValue={tags} onChange={setTags} readOnly={!editable} />
  </div>
  )
};

export default Tags;
