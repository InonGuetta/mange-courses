


const DialogContent = ({}) => {
  <DialogContent dividers sx={{ pt: 3 }}>
    {errorMessage && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage}
      </Alert>
    )}

    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        required
        fullWidth
        label="Course Name"
        name="nameCourse"
        value={formData.nameCourse}
        onChange={handleInputChange}
        variant="outlined"
        disabled={isLoading}
      />

      <TextField
        required
        fullWidth
        label="Course Details"
        name="detail"
        value={formData.detail}
        onChange={handleInputChange}
        variant="outlined"
        multiline
        rows={4}
        disabled={isLoading}
      />

      <FormControl fullWidth required>
        <InputLabel id="teacher-select-label">Teacher</InputLabel>
        <Select
          labelId="teacher-select-label"
          id="teacher-select"
          name="teacherId"
          value={formData.teacherId}
          label={roles.teacher}
          onChange={handleInputChange}
          disabled={isLoading}
        >
          {teachers.length > 0 ? (
            teachers.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No teachers available</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  </DialogContent>;
};
