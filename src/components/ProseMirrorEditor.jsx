// src/ProseMirrorEditor.js
import React, { useEffect, useRef } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";

const ProseMirrorEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(editorRef.current),
        schema,
      });

      viewRef.current = new EditorView(editorRef.current, {
        state,
        dispatchTransaction(transaction) {
          const newState = viewRef.current.state.apply(transaction);
          viewRef.current.updateState(newState);
          if (onChange) {
            onChange(newState.doc);
          }
        },
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, [onChange]);

  return <div ref={editorRef}>{content}</div>;
};

export default ProseMirrorEditor;
