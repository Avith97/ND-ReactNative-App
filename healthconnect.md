# Detecting Manually Entered Steps in Google Fit

## Understanding the Response
The response from `react-native-health-connect` provides metadata about step count records. By analyzing specific fields, we can determine whether the steps were manually entered or automatically recorded.

## Key Fields in the Response
### 1. **Metadata Section**
- **`recordingMethod`**: This indicates how the steps were recorded. A value of `0` suggests that the data was manually entered, while other values may indicate automatic tracking.
- **`device`**: This object contains details about the recording device:
  - `model`: If `null`, it suggests no physical tracking device was used.
  - `manufacturer`: If `null`, it further confirms the absence of a recording device.
  - `type`: A value of `0` typically suggests no associated device.
- **`dataOrigin`**: Indicates the source of the data. If it is `com.google.android.apps.fitness`, the data was entered via Google Fit.
- **`lastModifiedTime`**: Timestamp of when the record was last updated.

### 2. **Step Count Data**
- **`count`**: The number of steps recorded.
- **`startTime` and `endTime`**: The time range during which the steps were logged.

## How to Identify Manually Entered Steps
1. **Check `recordingMethod`**: If `0`, it is likely a manual entry.
2. **Check `device` Details**:
   - If `model` and `manufacturer` are `null`, no physical device was used.
   - If they contain values, the steps were likely recorded by a device (e.g., phone, smartwatch).
3. **Check `dataOrigin`**: If `com.google.android.apps.fitness`, the data was entered through Google Fit, likely manually.
4. **Compare with Automatic Entries**:
   - Automatic entries generally include device metadata.
   - They may have different `recordingMethod` values.

## Conclusion
By analyzing `recordingMethod`, `device`, and `dataOrigin`, we can distinguish between manually entered and automatically tracked steps. If all device fields are `null` and `recordingMethod` is `0`, the step count was manually added in Google Fit.
