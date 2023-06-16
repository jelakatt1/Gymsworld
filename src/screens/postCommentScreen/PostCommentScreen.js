import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader, Label, Section } from '../../components';
import { METHOD, ROUTES } from '../../data/remote/routes';
import apiRequest from '../../data/remote/webHandler';
import { En } from '../../enums/AppEnums';
import { ActiveOpacity, COLOR, TEXT_STYLE, commonStyles, hp, wp } from '../../enums/StyleGuide';
import { setGymPosts } from '../../redux/actions/Actions';
import { isIOS, showFlash } from '../../utils/myUtils';



export default function PostCommentScreen({ route }) {

  const user = useSelector(({ appReducer }) => appReducer.user)
  const gymPosts = useSelector(({ appReducer }) => appReducer.gymPosts)

  const dispatch = useDispatch();


  const flatListRef = useRef(null);

  const [typedComment, setTypedComment] = useState('')
  const comments = route?.params?.comments
  const post_id = route?.params?.postId

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (comments.length > 0) {
        setTimeout(() => {
          flatListRef.current.scrollToEnd();

        }, 300);
      }
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [Keyboard]);

  useEffect(() => {
    if (comments.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd();

      }, 300);
    }
  }, [])




  const addComment = async () => {
    if (typedComment != '') {
      try {
        const result = await apiRequest({
          method: METHOD.POST,
          url: ROUTES.ADD_COMMENT,
          data: { user_id: user.id, post_id: post_id, comment: typedComment }
        });

        if (result.status === 200) {

          //Creating new object at post [] index
          const newComment = {
            id: Date.now(),
            comment: typedComment,
            user_name: user.first_name + ' ' + user.last_name,
            created_at: '2 seconds ago',
          };

          const updatedGymPosts = [...gymPosts];
          const postIndex = updatedGymPosts.findIndex((post) => post.id === post_id);
          updatedGymPosts[postIndex].comments.push(newComment);

          dispatch(setGymPosts(updatedGymPosts));
          setTypedComment('')


        }
      } catch (error) {
        console.log(error);
      }
    }
    else showFlash('Please write comment...')

  }


  const renderItem = ({ item }) => (
    <View style={styles.comment}>
      <Label text={item.user_name} style={TEXT_STYLE.text_bold} textColor={COLOR.WHITE} spaceR={wp(2)} />
      <Label text={item.comment} style={[TEXT_STYLE.text, { fontSize: 12, marginTop: 5 }]} textColor={COLOR.WHITE} spaceR={wp(2)} />
      <Label text={item.created_at} style={[TEXT_STYLE.text, { fontSize: 10, marginTop: 5, alignSelf: 'flex-end' }]} textColor={COLOR.YELLOW} spaceR={wp(2)} />
    </View>
  );

  return (
    <Section style={commonStyles.flex_1} bg={COLOR.BLACK}>
      <AppHeader
        title={'Comments'}
        LeftComp={En.BackArrow}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={isIOS() ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <FlatList
          ref={flatListRef}
          data={comments}
          renderItem={renderItem}
          style={{ marginTop: isIOS() ? 20 : 0 }}
          onContentSizeChange={() => {
            setTimeout(() => {
              flatListRef?.current?.scrollToEnd()
            }, 200);

          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            cursorColor={COLOR.GREY}
            placeholder="Type your comment..."
            value={typedComment}
            placeholderTextColor={COLOR.LIGHT_GREY}
            onChangeText={(e) => setTypedComment(e)}

          />
          <TouchableOpacity activeOpacity={ActiveOpacity}
            onPress={() => addComment()}>
            <Label text={'Post'} style={TEXT_STYLE.text_bold} textColor={COLOR.YELLOW} spaceR={wp(2)} />
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </Section>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: isIOS() ? 20 : 0
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLOR.BLACK,



  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_GREY,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    height: hp(5.5),
    color: COLOR.LIGHT_GREY
  },
  comment: {
    backgroundColor: COLOR.GREY_2,
    borderRadius: hp(1),
    marginVertical: 5,
    ...commonStyles.ph_4,
    ...commonStyles.mh_4,
    ...commonStyles.pv_2,
    marginBottom: 10

  },
});

