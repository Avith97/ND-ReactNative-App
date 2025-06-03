import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    SectionList
} from 'react-native';
import Colors from '../../../utils/constants/Colors';
import { wp } from '../../functions/dimensions';
import Icons, { iconType } from '../../../assets/icons/Icons';
// import { Ionicons } from '@expo/vector-icons';

const MultiSelectDropdown = ({
    data = [],
    labelExtractor = (item) => item.label,
    valueExtractor = (item) => item.value,
    onChange = () => { },
    placeholder = 'Select option(s)',
    multiSelect = true,
    name = '',
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (item) => {
        const itemValue = valueExtractor(item);
        const isSelected = selectedItems.some(
            (selected) => valueExtractor(selected) === itemValue
        );

        let updatedSelected;
        if (multiSelect) {
            if (isSelected) {
                updatedSelected = selectedItems.filter(
                    (selected) => valueExtractor(selected) !== itemValue
                );
            } else {
                updatedSelected = [...selectedItems, item];
            }
        } else {
            updatedSelected = [item];
            setModalVisible(false); // Close modal on single select
        }

        setSelectedItems(updatedSelected);
        // onChange(name, updatedSelected);
        onChange(name, updatedSelected.map(valueExtractor));
    };

    const isSelected = (item) =>
        selectedItems.some(
            (selected) => valueExtractor(selected) === valueExtractor(item)
        );

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer} activeOpacity={0.5}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    editable={false}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                    value={selectedItems.map(labelExtractor).join(', ')}
                />
                <Icons type={iconType.ionicon} name="chevron-down" size={20} color="gray" style={styles.icon} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalOverlay}
                    onPressOut={() => setModalVisible(false)}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <SectionList
                            sections={data}
                            keyExtractor={(item, index) => valueExtractor(item) + index}
                            renderSectionHeader={({ section: { title } }) => (
                                title &&
                                <Text style={styles.groupTitle}>{title}</Text>
                            )}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelect(item)}
                                    style={[
                                        styles.option,
                                        isSelected(item) && styles.optionSelected,
                                    ]}
                                >
                                    <Text style={isSelected(item) ? styles.selectedText : styles.optionText}>
                                        {labelExtractor(item)}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        {multiSelect && (
                            <TouchableOpacity
                                style={styles.doneButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.doneText}>Done</Text>
                            </TouchableOpacity>
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    icon: {
        marginLeft: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000055',
    },
    modalContent: {
        maxHeight: '70%',
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 8,
        padding: 10,
    },
    groupTitle: {
        //group header
        color: '#007AFF',
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '',
    },
    option: {
        // option
        paddingLeft: wp(6),
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
    optionSelected: {
        backgroundColor: '#e6f7ff',
    },
    optionText: {
        fontSize: 16,
    },
    selectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    doneButton: {
        marginTop: 10,
        padding: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        alignItems: 'center',
    },
    doneText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MultiSelectDropdown;

{/* <MultiSelectDropdown
    //single sel data
    data={[
        {
            // title: 'Fruits',
            data: [
                { name: 'Apple', value: 'apple' },
                { name: 'Banana', value: 'banana' },
                { name: 'Mango', value: 'mango' },
            ],
        },
    ]}
    //mulstisel data
    // data={[
    //   {
    //     title: 'Fruits',
    //     data: [
    //       { name: 'Apple', value: 'apple' },
    //       { name: 'Banana', value: 'banana' },
    //       { name: 'Mango', value: 'mango' },
    //     ],
    //   },
    //   {
    //     title: 'Vegetables',
    //     data: [
    //       { name: 'Carrot', value: 'carrot' },
    //       { name: 'Spinach', value: 'spinach' },
    //       { name: 'Potato', value: 'potato' },
    //     ],
    //   },
    //   {
    //     title: 'Dairy',
    //     data: [
    //       { id: 1, name: 'Milk', value: 'milk' },
    //       { id: 2, name: 'Cheese', value: 'cheese' },
    //       { id: 3, name: 'Butter', value: 'butter' },
    //     ],
    //   },
    // ]}
    valueExtractor={(item) => item.name}
    labelExtractor={(item) => item.value}
    name="groceries"
    // multiSelect
    // multiSelect={true}
    // multiSelect={false}
    onChange={(name, values) => console.log('Selected:', name, values)}
    placeholder="Select grocery items"
/> */}
