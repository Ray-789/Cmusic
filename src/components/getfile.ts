import {FFmpegKit, ReturnCode, FFmpegKitConfig} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import {v4 as uuidv4} from 'uuid';

const getFileNameFromPath = path => {
  const fragments = path.split('/');
  let fileName = fragments[fragments.length - 1];
  fileName = fileName.split('.')[0];
  return fileName;
};

export const deletefile = file => {
  return new Promise(async (resolve, reject) => {
    console.log(file.url);
    RNFS.unlink(`${file.url}`)
      .then(result => {
        console.log(result);
        resolve(200);
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
        reject(err.message);
      });
  });
};
export const ChangeName = (file, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(file);
      console.log(file.url.slice(0, file.url.lastIndexOf('/') + 1));
      const ext = file.title.slice(file.title.lastIndexOf('.') + 1);
      let outputImagePath = `${name}.${ext}`;
      FFmpegKit.execute(
        `-i '${file.url}' '${
          file.url.slice(0, file.url.lastIndexOf('/') + 1) +
          '/' +
          outputImagePath
        }' -y`,
      ).then(async session => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          const output = await session.getOutput();
          console.log(output);
          deletefile(file).then(result => {
            resolve(200);
          });
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          reject(returnCode);
        } else {
          // ERROR
          reject('some Other');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const eightD = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('sdsdfasdfasdfasdf:', file);
      const id = await uuidv4();
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}___${id}.mp3`;
      FFmpegKit.execute(
        `-i '${file.url}' -af apulsator=hz=0.125 '${outputImagePath}'`,
      ).then(async session => {
        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          const output = await session.getOutput();
          console.log(output);
          resolve(200);
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          reject(returnCode);
        } else {
          // ERROR
          reject('some Other');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const reverbeffect = (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await uuidv4();
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}___${id}.mp3`;
      FFmpegKit.execute(
        `-i '${file.url}' -map 0 -c:v copy -af aecho=0.6:0.3:1000:0.5 '${outputImagePath}'`,
      ).then(async session => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          const output = await session.getOutput();
          console.log(output);
          resolve(200);
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          reject(returnCode);
        } else {
          // ERROR
          reject('some Other');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const mute = async (file, start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await Math.floor(Math.random() * 1000);
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}___${id}_Muted.mp3`;
      FFmpegKit.execute(
        `-i '${file.url}' -af "volume=enable='between(t,${start},${end})':volume=0" '${outputImagePath}'`,
      ).then(async session => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          const output = await session.getOutput();
          console.log(output);
          resolve(200);
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          reject(returnCode);
        } else {
          // ERROR
          reject('some Other');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const cutVideo = async (file, start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await Math.floor(Math.random() * 1000);
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}___${id}.mp3`;
      FFmpegKit.execute(
        `-ss ${start} -to ${end} -i '${file.url}' '${outputImagePath}'`,
      ).then(async session => {
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          const output = await session.getOutput();
          console.log(output);
          resolve(200);
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          reject(returnCode);
        } else {
          // ERROR
          reject('some Other');
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });
};

export const Deleteshit = async (file, start, end, duration) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await Math.floor(Math.random() * 100);
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}___${id}`;
      if (end > duration || duration === end) {
        FFmpegKit.execute(
          `-ss ${0} -to ${start} -i '${
            file.url
          }' '${outputImagePath}'_Deleted.mp3`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            const output = await session.getOutput();
            console.log(output);
            return resolve(200);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      } else if (start === 0 || start < 0) {
        console.log('sdfasdgfasdfasd');
        FFmpegKit.execute(
          `-ss ${end} -to ${duration} -i '${file.url}' '${outputImagePath}'_Deleted.mp3`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();
          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            const output = await session.getOutput();
            console.log(output);
            resolve(200);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      } else {
        FFmpegKit.execute(
          `-ss ${start} -to ${end} -i '${file.url}' '${outputImagePath}'_work_2.mp3`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            const output = await session.getOutput();
            FFmpegKit.execute(
              `-ss ${0} -to ${start} -i '${
                file.url
              }' '${outputImagePath}1_work_.mp3'`,
            ).then(async session => {
              const returnCode = await session.getReturnCode();

              if (ReturnCode.isSuccess(returnCode)) {
                // SUCCESS
                const output = await session.getOutput();
                FFmpegKit.execute(
                  `-ss ${end} -to ${duration} -i '${file.url}' '${outputImagePath}'3_work_.mp3`,
                ).then(async session => {
                  const returnCode = await session.getReturnCode();

                  if (ReturnCode.isSuccess(returnCode)) {
                    // SUCCESS
                    const output = await session.getOutput();

                    FFmpegKit.execute(
                      `-i '${outputImagePath}1_work_.mp3' -i '${outputImagePath}3_work_.mp3' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}_Deleted.mp3'`,
                    ).then(async session => {
                      const returnCode = await session.getReturnCode();
                      if (ReturnCode.isSuccess(returnCode)) {
                        // SUCCESS
                        const output = await session.getOutput();
                        console.log(output);
                        console.log(start, end);
                        resolve(200);
                      } else if (ReturnCode.isCancel(returnCode)) {
                        // CANCEL
                        reject(returnCode);
                      } else {
                        // ERROR
                        reject('some Other');
                      }
                    });
                  } else if (ReturnCode.isCancel(returnCode)) {
                    // CANCEL
                    reject(returnCode);
                  } else {
                    // ERROR
                    reject('some Other');
                  }
                });
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
                reject(returnCode);
              } else {
                // ERROR
                reject('some Other');
              }
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            // CANCEL
            reject(returnCode);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  });
};

//cut the part

//then figure out where to put it

//cut first part

// add the cut to first part

//get second part

// add the hole shit to second part

export const Repeatshit = async (file, start, end, third, duration) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await uuidv4();
      let outputImagePath = `${RNFS.CachesDirectoryPath}/${file.title}_${id}`;

      if ((start === 0 || start < 0) && (third === 0 || third < 0)) {
        console.log(
          'saffffffffffffffffffffffffffffff\ndsagfdsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nasgfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasfdgdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\n11111111111111111111111111111111111111111111111111111',
        );
        FFmpegKit.execute(
          `-ss 00:00:00 -to ${end} -i '${file.url}' '${outputImagePath}0_work_.mp3' -y `,
        ).then(async session => {
          const returnCode = await session.getReturnCode();
          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            FFmpegKit.execute(
              `-i '${outputImagePath}0_work_.mp3'  -i '${file.url}' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}_Repeat.mp3'`,
            ).then(async session => {
              const returnCode = await session.getReturnCode();

              if (ReturnCode.isSuccess(returnCode)) {
                // SUCCESS
                return resolve(200);
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
                reject(returnCode);
              } else {
                // ERROR

                reject('some Other');
              }
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            // CANCEL
            reject(returnCode);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      }
      if ((start !== 0 || start > 0) && (third < 0 || third === 0)) {
        console.log(
          'saffffffffffffffffffffffffffffff\ndsagfdsfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\nasgfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddasfdgdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd\n11111111111111111111111111111111111111111111111111111\n2333333333333333333333333333333333333333333333333333333333333333333333',
        );

        FFmpegKit.execute(
          `-ss ${start} -to ${end} -i '${file.url}' '${outputImagePath}0_work_.mp3'`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            FFmpegKit.execute(
              `-i '${outputImagePath}0_work_.mp3'  -i '${file.url}' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}_Repeat.mp3'`,
            ).then(async session => {
              const returnCode = await session.getReturnCode();

              if (ReturnCode.isSuccess(returnCode)) {
                // SUCCESS
                return resolve(200);
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
                reject(returnCode);
              } else {
                // ERROR

                reject('some Other');
              }
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            // CANCEL
            reject(returnCode);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      }
      if (third > duration || third === duration) {
        FFmpegKit.execute(
          `-ss ${start} -to ${end} -i '${file.url}' '${outputImagePath}0_work_.mp3'`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            const output = await session.getOutput();

            FFmpegKit.execute(
              `-i '${file.url}' -i '${outputImagePath}0_work_.mp3' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}_Repeat.mp3'`,
            ).then(async session => {
              const returnCode = await session.getReturnCode();

              if (ReturnCode.isSuccess(returnCode)) {
                // SUCCESS
                const output = await session.getOutput();
                resolve(200);
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
                reject(returnCode);
              } else {
                // ERROR
                reject('some Other');
              }
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            // CANCEL
            reject(returnCode);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      } else {
        FFmpegKit.execute(
          `-ss ${start} -to ${end} -i '${file.url}' '${outputImagePath}'0_work_.mp3`,
        ).then(async session => {
          const returnCode = await session.getReturnCode();

          if (ReturnCode.isSuccess(returnCode)) {
            // SUCCESS
            const output = await session.getOutput();
            console.log(output);
            FFmpegKit.execute(
              `-ss ${0} -to ${third} -i '${
                file.url
              }' '${outputImagePath}'1_work_.mp3`,
            ).then(async session => {
              const returnCode = await session.getReturnCode();

              if (ReturnCode.isSuccess(returnCode)) {
                // SUCCESS
                const output = await session.getOutput();
                console.log(output);
                FFmpegKit.execute(
                  `-ss ${third} -to ${duration} -i '${file.url}' '${outputImagePath}'2_work_.mp3`,
                ).then(async session => {
                  const returnCode = await session.getReturnCode();

                  if (ReturnCode.isSuccess(returnCode)) {
                    // SUCCESS
                    const output = await session.getOutput();
                    console.log(output);

                    FFmpegKit.execute(
                      `-i '${outputImagePath}1_work_.mp3' -i '${outputImagePath}0_work_.mp3' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}4_work_.mp3'`,
                    ).then(async session => {
                      const returnCode = await session.getReturnCode();
                      if (ReturnCode.isSuccess(returnCode)) {
                        // SUCCESS
                        const output = await session.getOutput();
                        console.log(output);
                        FFmpegKit.execute(
                          `-i '${outputImagePath}4_work_.mp3' -i '${outputImagePath}2_work_.mp3' -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1" '${outputImagePath}_Repeat.mp3'`,
                        ).then(async session => {
                          const returnCode = await session.getReturnCode();
                          if (ReturnCode.isSuccess(returnCode)) {
                            // SUCCESS
                            const output = await session.getOutput();
                            resolve(200);
                          } else if (ReturnCode.isCancel(returnCode)) {
                            // CANCEL
                            reject(returnCode);
                          } else {
                            // ERROR
                            reject('some Other');
                          }
                        });
                      } else if (ReturnCode.isCancel(returnCode)) {
                        // CANCEL
                        reject(returnCode);
                      } else {
                        // ERROR
                        reject('some Other');
                      }
                    });
                  } else if (ReturnCode.isCancel(returnCode)) {
                    // CANCEL
                    reject(returnCode);
                  } else {
                    // ERROR
                    reject('some Other');
                  }
                });
              } else if (ReturnCode.isCancel(returnCode)) {
                // CANCEL
                reject(returnCode);
              } else {
                // ERROR
                reject('some Other');
              }
            });
          } else if (ReturnCode.isCancel(returnCode)) {
            // CANCEL
            reject(returnCode);
          } else {
            // ERROR
            reject('some Other');
          }
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  });
};

//lets try change file name in downloads

export const handleVideoLoad = (selectedVideo: any) => {
  console.log('sfefsegqesrgqsrgqesrgq  sgqserg', selectedVideo);
  let outputImagePath = `${RNFS.CachesDirectoryPath}/audio(###).mp3`;
  FFmpegKit.execute(
    `-i ${selectedVideo} -ab 320k -map_metadata 0 -id3v2_version 3 ${outputImagePath}`,
  ).then(async session => {
    // Unique session id created for this execution
    const sessionId = session.getSessionId();

    // Command arguments as a single string
    const command = session.getCommand();

    // Command arguments
    const commandArguments = session.getArguments();

    // State of the execution. Shows whether it is still running or completed
    const state = await session.getState();

    // Return code for completed sessions. Will be undefined if session is still running or FFmpegKit fails to run it
    const returnCode = await session.getReturnCode();

    const startTime = session.getStartTime();
    const endTime = await session.getEndTime();
    const duration = await session.getDuration();

    // Console output generated for this execution
    const output = await session.getOutput();
    console.log(output);
    // The stack trace if FFmpegKit fails to run a command
    const failStackTrace = await session.getFailStackTrace();
    console.log('outpu:', output);
    // The list of logs generated for this execution
    const logs = await session.getLogs();
    console.log('logs:', logs);

    // The list of statistics generated for this execution (only available on FFmpegSession)
    const statistics = await session.getStatistics();
  });
};
