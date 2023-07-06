import { useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Container, Content, IconGroup } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Platform, KeyboardAvoidingView, Alert } from "react-native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possivel criar um novo grupo");
        console.log(error);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={keyboardBehavior}
      enabled
    >
      <Container>
        <Header showBackButton />
        <Content>
          <IconGroup name="account-group-outline" />
          <Highlight
            title="Nova turma"
            subtitle="crie a turma para adicionar as pessoas"
          />
          <Input placeholder="Nome da turma" onChangeText={setGroup} />

          <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
}
