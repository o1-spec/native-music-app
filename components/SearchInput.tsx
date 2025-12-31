import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

function SearchInput({ onSearch, placeholder = "Search for songs, artists, albums..." }: SearchInputProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <View className="p-4">
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="bg-gray-800 text-white p-4 rounded-lg"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}

export default SearchInput;