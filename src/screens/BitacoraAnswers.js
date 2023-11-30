import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Header from '../components/Header';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

const BuserAnswer = ({ data }) => {
    const [viewData, setViewData] = useState(false)

    const emojis = [
        "😡",
        "😨",
        "🙁",
        "😐",
        "🙂",
        "😁",
        "🥰"
    ];
    const answers = {
        name: "Encuesta 1: Conociendo la aplicación",
        user_id: '1',
        questions: [{
            id_question: 1,
            question: "¿Con que nivel de energía te iras de la clase?",
            answer: 5
        },
        {
            id_question: 2,
            question: "¿Que nota le pondrias a esta actividad?",
            answer: 6
        },
        {
            id_question: 3,
            question: "¿Como te vas de la clase?, menciona una emoción de la imagen",
            answer: "Alegre"
        },
        {
            id_question: 4,
            question: "¿Que aprendiste de la clase de hoy? Comparte una reflexión personal",
            answer: "Estuve aprendiendo a utilizar la aplicación, esta muy bonita!!"
        }]
    }

    console.log(viewData)

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => setViewData((prev) => !prev)}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: data.uri_image_profile }}
                            style={{ width: 40, height: 40, borderRadius: 100 }}
                        />
                        <Text style={{ fontSize: 16 }}> {data.username} </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {viewData &&
                <View>
                    <Text style={{ fontSize: 13, fontWeight: 600, paddingVertical: 4 }}>
                        {answers.questions[0].question}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: 400, paddingVertical: 4 }}>
                        {emojis[answers.questions[0].answer]}
                    </Text>


                    {answers.questions.slice(1).map((value, index) => (
                        <View key={index}>
                            <Text style={{ fontSize: 13, fontWeight: 600, paddingVertical: 4 }}>
                                {value.question}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 400, paddingVertical: 4 }}>
                                {value.answer}
                            </Text>
                        </View>



                    ))}
                </View>
            }

        </View>
    )
}

const renderSeparator = () => (
    <View
        style={{
            backgroundColor: '#E3E3E3',
            height: 1,
        }}
    />
);

export default function BitacoraAnswers({ route }) {
    const { name } = route.params
    console.log("name", name)

    const users = [
        {
            id_user: 2,
            username: "Diterod",
            uri_image_profile: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile3.jpg",
            type_user: 0
        },
        {
            id_user: 3,
            username: "javiermmo98",
            uri_image_profile: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/userProfile.png",
            type_user: 0
        },
        {
            id_user: 4,
            username: "Atomic00",
            uri_image_profile: "https://raw.githubusercontent.com/Rickerod/School-app/master/src/storage/images/profile5.jpg",
            type_user: 0
        }
    ]
    return (
        <View style={{ flex: 1 }}>
            <Header title="Respuestas encuesta" id={1} wd={0} />
            <View style={{ flex: 1, padding: 4 }}>
                <Text style={{ fontSize: 17, fontWeight: 500, paddingVertical: 20 }}> {name}.</Text>
                <FlatList
                    data={users}
                    renderItem={({ item }) => <BuserAnswer data={item}> </BuserAnswer>}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>

        </View>
    );
}
